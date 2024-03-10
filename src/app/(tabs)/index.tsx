import { ScrollView, StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";
import { FontAwesome } from "@expo/vector-icons";
import PlanCard from "@/components/PlanCard";

export default function SubstitutionPlan() {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Montag</Text>
        <Text style={styles.textAccent}>04.03.2024</Text>
      </View>
      <Text style={{ ...styles.textAccent, textAlign: "center", marginTop: 18 }}>
        Letzte Aktualisierung 04.03.2024 16:20 h
      </Text>
      <ScrollView style={styles.cardScrollContainer}>
        <PlanCard />
        <PlanCard />
        <PlanCard />
        <PlanCard />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  headerContainer: {
    paddingTop: 48,
    alignItems: "center",
    justifyContent: "center",
    gap: 3,
  },
  textAccent: {
    color: "#7f8690",
  },
  cardScrollContainer: {
    flex: 1,
    marginVertical: 10,
    paddingHorizontal: 24,
  },
});
