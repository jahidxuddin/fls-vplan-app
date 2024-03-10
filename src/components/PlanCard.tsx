import { FontAwesome } from "@expo/vector-icons";
import { Text, View } from "./Themed";
import { StyleSheet } from "react-native";
import { VplanData } from "@/app/(tabs)";

function removeYear(datum: string): string {
  const teile = datum.split('.');
  teile.pop();

  return teile.join('.');
}

export default function PlanCard({
  vplanData,
  date,
}: {
  vplanData: VplanData;
  date: string;
}) {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardContainerHeader}>
        <Text style={{ fontWeight: "bold" }}>{vplanData.class_name}</Text>
        <Text>
          {removeYear(date)}, {vplanData.position}
        </Text>
      </View>
      <View style={styles.cardContainerContent}>
        <Text>
          {vplanData.subject}{" "}
          <Text style={styles.textAccent}>
            bei {vplanData.teacher} in Raum {vplanData.room}
          </Text>
        </Text>
        {vplanData.info.includes("Klasse frei") && (
          <Text style={styles.cardContainerAccent}>Entfall</Text>
        )}
        {vplanData.info.includes("Vertreten") && (
          <Text style={styles.cardContainerAccent}>Vertretung</Text>
        )}
        {vplanData.vroom.includes("Exkursion") && (
          <Text style={styles.cardContainerAccent}>Ekursion</Text>
        )}
        {(vplanData.vroom.length > 0 && vplanData.vroom !== "Exkursion") && (
          <Text style={styles.cardContainerAccent}>Raumänderung {vplanData.vroom}</Text>
        )}
        {vplanData.vteacher.length > 0 && (
          <View style={styles.cardContainerRow}>
            <FontAwesome
              style={{ marginLeft: 3 }}
              size={28}
              name="user"
              color="#7f8690"
            />
            <Text style={styles.textAccent}>{vplanData.vteacher}</Text>
          </View>
        )}
      </View>
      {vplanData.merkmal.length > 0 && (
        <View style={styles.cardContainerFooter}>
          <FontAwesome
            style={{ marginLeft: 3 }}
            size={28}
            name="info"
            color="#7f8690"
          />
          <Text style={styles.textAccent}>{vplanData.merkmal}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    gap: 10,
    backgroundColor: "#f7f2fa",
    marginTop: 10,
    padding: 18,
    borderRadius: 18,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  cardContainerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f7f2fa",
  },
  cardContainerContent: {
    backgroundColor: "#f7f2fa",
    gap: 10,
  },
  cardContainerFooter: {
    backgroundColor: "#f7f2fa",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  cardContainerAccent: {
    fontWeight: "bold",
  },
  cardContainerRow: {
    backgroundColor: "#f7f2fa",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  textAccent: {
    color: "#7f8690",
  },
});
