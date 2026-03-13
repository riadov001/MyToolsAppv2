import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Calendar from "expo-calendar";
import { Platform } from "react-native";

export const syncReservationsToCalendar = async (
  reservations: any[],
): Promise<{ success: boolean; message: string; count?: number }> => {
  try {
    if (Platform.OS === "web") {
      return { success: false, message: "Calendar sync not available on web" };
    }

    // Check consent
    const consentCalendar = await AsyncStorage.getItem("consent_calendar");
    if (consentCalendar !== "true") {
      return { success: false, message: "Calendar sync not authorized" };
    }

    // Request permission if needed
    const { status: existingStatus } = await Calendar.getCalendarPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      await AsyncStorage.setItem("consent_calendar", "false");
      return { success: false, message: "Calendar permission denied" };
    }

    // Get or create MyTools calendar
    const calendars = await Calendar.getCalendarsAsync();
    let myToolsCalendar = calendars.find((c) => c.title === "MyTools");

    if (!myToolsCalendar) {
      const newCalendarId = await Calendar.createCalendarAsync({
        title: "MyTools",
        color: "#DC2626",
        entityType: Calendar.EntityTypes.EVENT,
        sourceId: Platform.OS === "ios" ? "local" : undefined,
        source: Platform.OS === "ios"
          ? undefined
          : {
              name: "MyTools",
              type: "LOCAL",
              isLocalAccount: true,
            },
        name: "MyTools",
        ownerAccount: "MyTools",
        timeZone: "Europe/Paris",
      });

      myToolsCalendar = await Calendar.getCalendarAsync(newCalendarId);
    }

    if (!myToolsCalendar?.id) {
      return { success: false, message: "Could not access calendar" };
    }

    // Filter confirmed reservations from now onwards
    const now = new Date();
    const confirmedUpcoming = reservations.filter((r) => {
      if (r.status?.toLowerCase() !== "confirmed") return false;
      const resDate = r.scheduledDate ? new Date(r.scheduledDate) : null;
      return resDate && resDate > now;
    });

    if (confirmedUpcoming.length === 0) {
      return { success: true, message: "No confirmed reservations to sync", count: 0 };
    }

    // Create events
    let count = 0;
    for (const reservation of confirmedUpcoming) {
      if (!reservation.scheduledDate) continue;

      const startDate = new Date(reservation.scheduledDate);
      const endDate = new Date(startDate.getTime() + 60 * 60 * 1000); // 1 hour duration

      const clientName = reservation.clientName ||
        reservation.clientFirstName && reservation.clientLastName
          ? `${reservation.clientFirstName} ${reservation.clientLastName}`.trim()
          : "Client";

      const serviceType = reservation.serviceType || "";
      const title = `${clientName}${serviceType ? " - " + serviceType : ""}`;

      try {
        await Calendar.createEventAsync(myToolsCalendar.id, {
          title,
          startDate,
          endDate,
          timeZone: "Europe/Paris",
          notes: `Rendez-vous ID: ${reservation.id}`,
        });
        count++;
      } catch (eventError) {
        // Continue with next event even if one fails
      }
    }

    return {
      success: true,
      message: `Synchronisé ${count} rendez-vous avec le calendrier`,
      count,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Calendar sync failed",
    };
  }
};
