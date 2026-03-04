import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  RefreshControl,
  Platform,
  ActivityIndicator,
} from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useQuery } from "@tanstack/react-query";
import { supportApi } from "@/lib/api";
import Colors from "@/constants/colors";

const CATEGORY_ICONS: Record<string, any> = {
  "réservation": "calendar-outline",
  "devis": "document-text-outline",
  "facturation": "receipt-outline",
  "problème technique": "bug-outline",
  "question générale": "help-circle-outline",
  "autre": "chatbubble-outline",
};

function getStatusInfo(status: string) {
  const s = (status || "").toLowerCase();
  if (s === "resolved" || s === "résolu") return { label: "Résolu", color: "#16A34A", bg: "#DCFCE7", icon: "checkmark-circle-outline" as const };
  if (s === "open" || s === "ouvert" || s === "new" || s === "nouveau") return { label: "Ouvert", color: "#D97706", bg: "#FEF3C7", icon: "time-outline" as const };
  if (s === "in_progress" || s === "en_cours") return { label: "En traitement", color: "#3B82F6", bg: "#DBEAFE", icon: "hourglass-outline" as const };
  if (s === "closed" || s === "fermé") return { label: "Fermé", color: Colors.textSecondary, bg: Colors.surfaceSecondary, icon: "lock-closed-outline" as const };
  return { label: status || "Envoyé", color: Colors.primary, bg: `${Colors.primary}15`, icon: "send-outline" as const };
}

function TicketCard({ ticket }: { ticket: any }) {
  const status = getStatusInfo(ticket.status);
  const category = (ticket.category || "").toLowerCase();
  const categoryIcon = CATEGORY_ICONS[category] || "chatbubble-outline";
  const createdDate = ticket.createdAt
    ? new Date(ticket.createdAt).toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : null;

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.categoryRow}>
          <View style={styles.categoryIconBg}>
            <Ionicons name={categoryIcon} size={16} color={Colors.primary} />
          </View>
          <Text style={styles.categoryText}>{ticket.category || "Support"}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: status.bg }]}>
          <Ionicons name={status.icon} size={13} color={status.color} />
          <Text style={[styles.statusText, { color: status.color }]}>{status.label}</Text>
        </View>
      </View>

      {ticket.subject && (
        <Text style={styles.subject} numberOfLines={2}>{ticket.subject}</Text>
      )}

      {ticket.message && (
        <Text style={styles.preview} numberOfLines={2}>{ticket.message}</Text>
      )}

      {createdDate && (
        <View style={styles.dateRow}>
          <Ionicons name="calendar-outline" size={13} color={Colors.textTertiary} />
          <Text style={styles.dateText}>{createdDate}</Text>
        </View>
      )}
    </View>
  );
}

export default function SupportHistoryScreen() {
  const insets = useSafeAreaInsets();
  const [refreshing, setRefreshing] = useState(false);

  const { data: tickets = [], isLoading, refetch } = useQuery({
    queryKey: ["support-history"],
    queryFn: supportApi.getHistory,
    retry: 1,
  });

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await refetch();
    } finally {
      setRefreshing(false);
    }
  }, [refetch]);

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.header,
          { paddingTop: Platform.OS === "web" ? 67 + 8 : insets.top + 8 },
        ]}
      >
        <Pressable onPress={() => router.back()} style={styles.headerBtn}>
          <Ionicons name="arrow-back" size={24} color={Colors.text} />
        </Pressable>
        <Text style={styles.headerTitle}>Historique support</Text>
        <View style={styles.headerBtn} />
      </View>

      {isLoading ? (
        <ActivityIndicator size="large" color={Colors.primary} style={styles.loader} />
      ) : (
        <FlatList
          data={Array.isArray(tickets) ? [...tickets].sort((a, b) => {
            const ta = a.createdAt ? new Date(a.createdAt).getTime() : 0;
            const tb = b.createdAt ? new Date(b.createdAt).getTime() : 0;
            return tb - ta;
          }) : []}
          keyExtractor={(item, idx) => item.id || String(idx)}
          renderItem={({ item }) => <TicketCard ticket={item} />}
          contentContainerStyle={[
            styles.listContent,
            { paddingBottom: Platform.OS === "web" ? 34 + 40 : insets.bottom + 40 },
          ]}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={Colors.primary} />
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="chatbubble-ellipses-outline" size={56} color={Colors.textTertiary} />
              <Text style={styles.emptyTitle}>Aucun ticket support</Text>
              <Text style={styles.emptyText}>
                Vos demandes de support apparaîtront ici. Utilisez le formulaire de contact pour envoyer un message à notre équipe.
              </Text>
              <Pressable
                style={styles.contactBtn}
                onPress={() => router.push("/support")}
              >
                <Ionicons name="send-outline" size={16} color="#fff" />
                <Text style={styles.contactBtnText}>Contacter le support</Text>
              </Pressable>
            </View>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerBtn: { width: 40, height: 40, justifyContent: "center", alignItems: "center" },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 17,
    fontFamily: "Inter_600SemiBold",
    color: Colors.text,
  },
  loader: { flex: 1, justifyContent: "center" },
  listContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    gap: 12,
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 8,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  categoryRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flex: 1,
  },
  categoryIconBg: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: `${Colors.primary}15`,
    justifyContent: "center",
    alignItems: "center",
  },
  categoryText: {
    fontSize: 13,
    fontFamily: "Inter_600SemiBold",
    color: Colors.text,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 12,
    fontFamily: "Inter_600SemiBold",
  },
  subject: {
    fontSize: 14,
    fontFamily: "Inter_600SemiBold",
    color: Colors.text,
  },
  preview: {
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    color: Colors.textSecondary,
    lineHeight: 19,
  },
  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  dateText: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
    color: Colors.textTertiary,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 80,
    paddingHorizontal: 32,
    gap: 8,
  },
  emptyTitle: {
    fontSize: 18,
    fontFamily: "Inter_600SemiBold",
    color: Colors.text,
    marginTop: 12,
  },
  emptyText: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    color: Colors.textSecondary,
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 8,
  },
  contactBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginTop: 8,
  },
  contactBtnText: {
    fontSize: 14,
    fontFamily: "Inter_600SemiBold",
    color: "#fff",
  },
});
