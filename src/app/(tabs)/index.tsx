import {
  NativeModules,
  RefreshControl,
  ScrollView,
  StyleSheet,
} from "react-native";

import { Text, View } from "@/components/Themed";
import PlanCard from "@/components/PlanCard";
import { useCallback, useEffect, useState } from "react";

function getDayOfWeek(dateString: string): string {
  try {
    const dateObject: Date = new Date(
      dateString.replace(/(\d{2}).(\d{2}).(\d{4})/, "$3-$2-$1")
    );

    const daysOfWeek: string[] = [
      "Sonntag",
      "Montag",
      "Dienstag",
      "Mittwoch",
      "Donnerstag",
      "Freitag",
      "Samstag",
    ];

    return daysOfWeek[dateObject.getDay()];
  } catch (error) {
    return "Ungültiges Datumsformat. Bitte geben Sie ein Datum im Format 'dd.mm.yyyy' an.";
  }
}

export type VplanData = {
  class_name: string;
  school_name: string;
  position: string;
  teacher: string;
  subject: string;
  room: string;
  vteacher: string;
  vsubject: string;
  vroom: string;
  merkmal: string;
  info: string;
};

export default function SubstitutionPlan() {
  const [refreshing, setRefreshing] = useState(false);
  const [vplanData, setVplanData] = useState<VplanData[]>([]);
  const [edited, setEdited] = useState("");
  const [date, setDate] = useState("");

  const fetchVplanData = async () => {
    try {
      const res = await fetch("http://192.168.178.43:3000");
      const data = await res.json();

      setEdited(data.edited);
      setDate(data.tables[0].date);
      
      const vplanData = data.tables[0].rows;
      setVplanData(vplanData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchVplanData();
  }, []);

  const onRefresh = useCallback(() => {
    fetchVplanData();
    setRefreshing(false);
  }, []);

  const { StatusBarManager } = NativeModules;

  return (
    <View style={styles.container}>
      <View
        style={{ backgroundColor: "#bfbfbf", height: StatusBarManager.HEIGHT }}
      ></View>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>{getDayOfWeek(date)}</Text>
        <Text style={styles.textAccent}>{date}</Text>
      </View>
      <Text
        style={{ ...styles.textAccent, textAlign: "center", marginTop: 18 }}
      >
        {edited && `Letzte Aktualisierung ${edited} Uhr`}
      </Text>
      <ScrollView
        style={styles.cardScrollContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <>
          {vplanData.length === 0 || vplanData === undefined ? (
            <Text style={{ textAlign: "center", fontSize: 24 }}>
              Keine Daten verfügbar
            </Text>
          ) : (
            vplanData.map((data, i) => (
              <PlanCard key={i} vplanData={data} date={date} />
            ))
          )}
        </>
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
    paddingTop: 18,
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
