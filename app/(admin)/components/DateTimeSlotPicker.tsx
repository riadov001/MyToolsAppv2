import React, { useState, useMemo } from "react";
import {
  View, Text, StyleSheet, Pressable, ScrollView, Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useTheme } from "@/lib/theme";

const TIME_SLOTS = [
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
  "11:00", "11:30", "12:00", "13:30", "14:00", "14:30",
  "15:00", "15:30", "16:00", "16:30", "17:00", "17:30",
];

const DAYS_FR = ["L", "M", "M", "J", "V", "S", "D"];
const MONTHS_FR = [
  "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
  "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre",
];

function buildCalendarDays(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay();
  const offset = firstDay === 0 ? 6 : firstDay - 1;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const days: Array<{ day: number | null; dateKey: string | null }> = [];
  for (let i = 0; i < offset; i++) days.push({ day: null, dateKey: null });
  for (let d = 1; d <= daysInMonth; d++) {
    const dateKey = `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    days.push({ day: d, dateKey });
  }
  return days;
}

function todayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function formatDateFR(dateKey: string, timeSlot?: string) {
  const [y, m, d] = dateKey.split("-");
  const date = new Date(parseInt(y), parseInt(m) - 1, parseInt(d));
  const dayName = new Intl.DateTimeFormat("fr-FR", { weekday: "long" }).format(date);
  const datePart = `${dayName} ${d} ${MONTHS_FR[parseInt(m) - 1]} ${y}`;
  if (timeSlot) return `${datePart} à ${timeSlot}`;
  return datePart;
}

interface DateTimeSlotPickerProps {
  onSelect: (dateKey: string, timeSlot: string) => void;
  selectedDate?: string;
  selectedTime?: string;
}

export function DateTimeSlotPickerButton({
  onSelect, selectedDate, selectedTime,
}: DateTimeSlotPickerProps) {
  const theme = useTheme();
  const [visible, setVisible] = useState(false);
  const [calMonth, setCalMonth] = useState<Date>(() => {
    if (selectedDate) {
      const [y, m] = selectedDate.split("-");
      return new Date(parseInt(y), parseInt(m) - 1, 1);
    }
    return new Date();
  });

  const calYear = calMonth.getFullYear();
  const calMonthIdx = calMonth.getMonth();
  const today = todayKey();
  const calDays = useMemo(() => buildCalendarDays(calYear, calMonthIdx), [calYear, calMonthIdx]);

  return (
    <>
      <Pressable
        style={[
          styles.button,
          { backgroundColor: theme.inputBg, borderColor: theme.border },
        ]}
        onPress={() => setVisible(true)}
      >
        <Ionicons name="calendar-outline" size={20} color={theme.primary} />
        <Text
          style={[
            styles.buttonText,
            { color: selectedDate ? theme.text : theme.textTertiary },
          ]}
        >
          {selectedDate && selectedTime
            ? formatDateFR(selectedDate, selectedTime)
            : "Sélectionner date et heure"}
        </Text>
      </Pressable>

      <Modal visible={visible} animationType="slide" onRequestClose={() => setVisible(false)}>
        <View style={[styles.container, { backgroundColor: theme.bg }]}>
          <View style={[styles.header, { borderBottomColor: theme.border }]}>
            <Pressable onPress={() => setVisible(false)}>
              <Ionicons name="close" size={24} color={theme.text} />
            </Pressable>
            <Text style={[styles.headerTitle, { color: theme.text }]}>Date & Heure</Text>
            <View style={{ width: 44 }} />
          </View>

          <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
            {/* Calendar Header */}
            <View style={[styles.calHeader, { borderBottomColor: theme.border }]}>
              <Pressable
                onPress={() => setCalMonth(d => new Date(d.getFullYear(), d.getMonth() - 1, 1))}
              >
                <Ionicons name="chevron-back" size={24} color={theme.primary} />
              </Pressable>
              <Text style={[styles.calMonthLabel, { color: theme.text }]}>
                {MONTHS_FR[calMonthIdx]} {calYear}
              </Text>
              <Pressable
                onPress={() => setCalMonth(d => new Date(d.getFullYear(), d.getMonth() + 1, 1))}
              >
                <Ionicons name="chevron-forward" size={24} color={theme.primary} />
              </Pressable>
            </View>

            {/* Days Header */}
            <View style={styles.daysHeader}>
              {DAYS_FR.map((d, i) => (
                <Text key={i} style={[styles.dayLabel, { color: theme.textTertiary }]}>
                  {d}
                </Text>
              ))}
            </View>

            {/* Calendar Grid */}
            <View style={styles.calGrid}>
              {calDays.map((cell, i) => {
                if (!cell.day || !cell.dateKey) {
                  return <View key={i} style={styles.calCell} />;
                }
                const isSelected = selectedDate === cell.dateKey;
                const isToday = cell.dateKey === today;
                const isPast = cell.dateKey < today;

                return (
                  <Pressable
                    key={i}
                    style={[
                      styles.calCell,
                      isSelected && { backgroundColor: theme.primary, borderRadius: 10 },
                      isToday && !isSelected && { borderWidth: 1, borderColor: theme.primary },
                      isPast && { opacity: 0.5 },
                    ]}
                    onPress={() => {
                      Haptics.selectionAsync();
                    }}
                    disabled={isPast}
                  >
                    <Text
                      style={[
                        styles.calCellText,
                        { color: isSelected ? "#fff" : theme.text },
                        isPast && { color: theme.textTertiary },
                      ]}
                    >
                      {cell.day}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            {/* Time Slots */}
            {selectedDate && (
              <View style={styles.slotsContainer}>
                <Text style={[styles.slotsTitle, { color: theme.text }]}>
                  Créneaux disponibles
                </Text>
                <View style={styles.slotsGrid}>
                  {TIME_SLOTS.map((slot) => {
                    const isSelectedSlot = selectedTime === slot;
                    return (
                      <Pressable
                        key={slot}
                        style={[
                          styles.slot,
                          {
                            backgroundColor: isSelectedSlot ? theme.primary : theme.inputBg,
                            borderColor: theme.border,
                          },
                        ]}
                        onPress={() => {
                          Haptics.selectionAsync();
                          onSelect(selectedDate, slot);
                          setTimeout(() => setVisible(false), 150);
                        }}
                      >
                        <Text
                          style={[
                            styles.slotText,
                            { color: isSelectedSlot ? "#fff" : theme.text },
                          ]}
                        >
                          {slot}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>
              </View>
            )}

            {selectedDate && selectedTime && (
              <View style={styles.confirmBox}>
                <Ionicons name="checkmark-circle" size={32} color={theme.primary} />
                <Text style={[styles.confirmText, { color: theme.text }]}>
                  {formatDateFR(selectedDate, selectedTime)}
                </Text>
                <Pressable
                  style={[styles.confirmBtn, { backgroundColor: theme.primary }]}
                  onPress={() => setVisible(false)}
                >
                  <Text style={styles.confirmBtnText}>Fermer</Text>
                </Pressable>
              </View>
            )}
          </ScrollView>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    marginVertical: 8,
  },
  buttonText: {
    fontSize: 14,
    flex: 1,
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: "Inter_600SemiBold",
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    paddingBottom: 40,
  },
  calHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 16,
    marginBottom: 16,
    borderBottomWidth: 1,
  },
  calMonthLabel: {
    fontSize: 18,
    fontFamily: "Inter_600SemiBold",
  },
  daysHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  dayLabel: {
    width: "14.28%",
    textAlign: "center",
    fontSize: 12,
    fontFamily: "Inter_500Medium",
  },
  calGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  calCell: {
    width: "14.28%",
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginBottom: 4,
  },
  calCellText: {
    fontSize: 14,
    fontFamily: "Inter_500Medium",
  },
  slotsContainer: {
    marginTop: 16,
  },
  slotsTitle: {
    fontSize: 16,
    fontFamily: "Inter_600SemiBold",
    marginBottom: 12,
  },
  slotsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  slot: {
    width: "30%",
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  slotText: {
    fontSize: 14,
    fontFamily: "Inter_500Medium",
  },
  confirmBox: {
    marginTop: 32,
    paddingVertical: 24,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: "rgba(59, 130, 246, 0.05)",
    alignItems: "center",
  },
  confirmText: {
    marginTop: 12,
    fontSize: 16,
    fontFamily: "Inter_600SemiBold",
    textAlign: "center",
  },
  confirmBtn: {
    marginTop: 16,
    paddingHorizontal: 32,
    paddingVertical: 10,
    borderRadius: 8,
  },
  confirmBtnText: {
    color: "#fff",
    fontSize: 14,
    fontFamily: "Inter_600SemiBold",
  },
});
