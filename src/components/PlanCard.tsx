import { FontAwesome } from "@expo/vector-icons";
import { Text, View } from "./Themed";
import { StyleSheet } from "react-native";

export default function PlanCard() {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardContainerHeader}>
        <Text style={{ fontWeight: 'bold' }}>11/2 W</Text>
        <Text>04.03., 1.-2.</Text>
      </View>
      <View style={styles.cardContainerContent}>
        <Text>
          Mathematik{" "}
          <Text style={styles.textAccent}>bei Herr Metz in Raum A209</Text>
        </Text>
        <Text style={styles.cardContainerAccent}>Vertretung</Text>
        <View style={styles.cardContainerRow}>
          <FontAwesome style={{ marginLeft: 3 }} size={28} name="user" color="#7f8690" />
          <Text style={styles.textAccent}>C. Aehlich</Text>
        </View>
      </View>
      <View style={styles.cardContainerFooter}>
        <FontAwesome style={{ marginLeft: 3 }} size={28} name="info" color="#7f8690" />
        <Text style={styles.textAccent}>Vertreten - Nachschreibearbeit Religion</Text>
      </View>
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
    }
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
