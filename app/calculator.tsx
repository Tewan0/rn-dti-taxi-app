import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const calculateTaxiFare = (distanceStr: string, timeStr: string) => {
  const dist = parseFloat(distanceStr) || 0;
  const timeInMinutes = parseFloat(timeStr) || 0;

  let fare = 35; // เริ่มต้น 1 กม. แรก

  if (dist > 1) {
    let remainingDist = dist - 1;

    // กิโลเมตรที่ 2 - 10 (กม.ละ 6.5)
    const step1 = Math.min(remainingDist, 9);
    fare += step1 * 6.5;
    remainingDist -= step1;

    // กิโลเมตรที่ 11 - 20 (กม.ละ 7.0)
    if (remainingDist > 0) {
      const step2 = Math.min(remainingDist, 10);
      fare += step2 * 7.0;
      remainingDist -= step2;
    }

    // กิโลเมตรที่ 21 - 40 (กม.ละ 8.0)
    if (remainingDist > 0) {
      const step3 = Math.min(remainingDist, 20);
      fare += step3 * 8.0;
      remainingDist -= step3;
    }

    // กิโลเมตรที่ 41 - 60 (กม.ละ 8.5)
    if (remainingDist > 0) {
      const step4 = Math.min(remainingDist, 20);
      fare += step4 * 8.5;
      remainingDist -= step4;
    }

    // กิโลเมตรที่ 61 - 80 (กม.ละ 9.0)
    if (remainingDist > 0) {
      const step5 = Math.min(remainingDist, 20);
      fare += step5 * 9.0;
      remainingDist -= step5;
    }

    // เกิน 80 กม. ขึ้นไป (กม.ละ 10.5)
    if (remainingDist > 0) {
      fare += remainingDist * 10.5;
    }
  }

  const trafficFare = timeInMinutes * 3.0;
  return {
    distanceFare: fare,
    trafficFare: trafficFare,
    totalFare: fare + trafficFare,
  };
};

export default function Calculator() {
  const [distance, setDistance] = useState("");
  const [trafficTime, setTrafficTime] = useState("");
  const [result, setResult] = useState({ total: 0, distFare: 0, timeFare: 0 });

  const handleDistanceChange = (text: string) => {
    // ลบทุกอย่างที่ไม่ใช่ตัวเลขและจุด
    let filtered = text.replace(/[^0-9.]/g, "");
    // ป้องกันจุดเกิน 1 จุด
    const parts = filtered.split(".");
    if (parts.length > 2) {
      filtered = parts[0] + "." + parts.slice(1).join("");
    }
    setDistance(filtered);
  };

  const handleCalculate = () => {
    const res = calculateTaxiFare(distance, trafficTime);
    setResult({
      total: res.totalFare,
      distFare: res.distanceFare,
      timeFare: res.trafficFare,
    });
  };

  const handleClear = () => {
    setDistance("");
    setTrafficTime("");
    setResult({ total: 0, distFare: 0, timeFare: 0 });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, backgroundColor: "#dfdfdf" }}
    >
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <Image
          source={require("@/assets/images/taxiCar.png")}
          style={styles.imgCalculator}
        />
        <Text style={styles.txtCalTaxi}>คำนวณค่าแท็กซี่</Text>

        <View style={styles.container}>
          <Text style={styles.txt1}>ระยะทาง (กิโลเมตร)</Text>
          <TextInput
            style={styles.txtInput}
            placeholder="0.0"
            placeholderTextColor={"#b1b1b1"}
            keyboardType="decimal-pad"
            value={distance}
            onChangeText={handleDistanceChange}
          />

          <Text style={[styles.txt1, { marginTop: 15 }]}>เวลารถติด (นาที)</Text>
          <TextInput
            style={styles.txtInput}
            placeholder="0"
            placeholderTextColor={"#b1b1b1"}
            keyboardType="number-pad"
            value={trafficTime}
            onChangeText={(t) => setTrafficTime(t.replace(/[^0-9]/g, ""))}
          />

          <View style={{ flexDirection: "row", gap: 10, marginTop: 20 }}>
            <TouchableOpacity
              style={[styles.btnCalculate, { flex: 2 }]}
              onPress={handleCalculate}
            >
              <Text style={styles.btnTxtWhite}>คำนวณราคา</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.btnCalculate2, { flex: 1 }]}
              onPress={handleClear}
            >
              <Text style={styles.btnTxtRed}>ล้างค่า</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.container2}>
          <Text
            style={[styles.txt2, { marginBottom: 10, textAlign: "center" }]}
          >
            ค่าโดยสารโดยประมาณ
          </Text>
          <View style={styles.priceWrapper}>
            <Text style={styles.bigPrice}>{result.total.toFixed(2)}</Text>
            <Text style={styles.currencyText}> บาท</Text>
          </View>

          <View style={styles.line} />

          <View style={styles.rowBetween}>
            <Text style={styles.txt2}>ค่าโดยสารตามระยะทาง</Text>
            <Text style={styles.txtValue}>{result.distFare.toFixed(2)} ฿</Text>
          </View>
          <View style={styles.rowBetween}>
            <Text style={styles.txt2}>ค่ารถติด (นาที)</Text>
            <Text style={styles.txtValue}>{result.timeFare.toFixed(2)} ฿</Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  priceWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "baseline",
  },
  bigPrice: {
    fontSize: 50,
    fontFamily: "Prompt_700Bold",
    color: "#ebac00",
  },
  currencyText: {
    fontSize: 20,
    fontFamily: "Prompt_700Bold",
    color: "#ebac00",
    marginBottom: 10,
  },
  btnTxtWhite: {
    color: "#ffffff",
    fontSize: 15,
    fontFamily: "Prompt_700Bold",
    textAlign: "center",
  },
  btnTxtRed: {
    color: "#ff0000",
    fontSize: 15,
    fontFamily: "Prompt_700Bold",
    textAlign: "center",
  },
  txtValue: {
    color: "#ffffff",
    fontSize: 15,
    fontFamily: "Prompt_700Bold",
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  line: {
    height: 1,
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.1)",
    marginVertical: 20,
  },
  txt2: {
    color: "#d2d2d2",
    fontSize: 14,
    fontFamily: "Prompt_400Regular",
  },
  container2: {
    backgroundColor: "#2D2D2D",
    padding: 20,
    margin: 20,
    borderRadius: 15,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  btnCalculate2: {
    backgroundColor: "#ffffff",
    borderWidth: 1.5,
    borderColor: "#ff0000",
    paddingVertical: 15,
    borderRadius: 10,
  },
  btnCalculate: {
    backgroundColor: "#039900",
    paddingVertical: 15,
    borderRadius: 10,
  },
  txtInput: {
    height: 50,
    paddingHorizontal: 15,
    borderColor: "#e0e0e0",
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 10,
    backgroundColor: "#f9f9f9",
    fontSize: 18,
    color: "#333",
  },
  txt1: {
    fontSize: 15,
    fontFamily: "Prompt_700Bold",
    color: "#333",
  },
  container: {
    backgroundColor: "#ffffff",
    padding: 20,
    marginTop: 10,
    marginHorizontal: 20,
    borderRadius: 15,
    elevation: 3,
  },
  txtCalTaxi: {
    fontSize: 28,
    fontFamily: "Prompt_700Bold",
    marginVertical: 10,
    textAlign: "center",
    color: "#ebac00",
  },
  imgCalculator: {
    width: 140,
    height: 140,
    alignSelf: "center",
    marginTop: 10,
  },
});
