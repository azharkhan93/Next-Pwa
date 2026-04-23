import { View, Text } from "@react-pdf/renderer";
import { styles } from "../RecordPDFTemplate.styles";
import { RatingHeader } from "./RatingHeader";

export const TestTableHeader = () => {
  return (
    <View style={styles.tableHeader}>
      <View style={styles.testCell}>
        <Text style={styles.headerCell}>Test</Text>
      </View>
      <View style={styles.methodCell}>
        <Text style={styles.headerCell}>Range</Text>
      </View>
      <View style={styles.additionalCell}>
        <Text style={styles.headerCell}>Unit</Text>
      </View>
      <View style={styles.resultsCell}>
        <Text style={styles.headerCell}>Results</Text>
      </View>
      <View style={[styles.rangeCell, { backgroundColor: "#ffffff" }]}>
        <View style={{ marginBottom: 2 }}>
          <Text style={styles.headerCell}>SOIL TEST RATINGS</Text>
        </View>
        <RatingHeader />
      </View>
      <View style={[styles.cecCell, { backgroundColor: "#ffffff" }]}>
        <Text style={styles.headerCell}>Cation Exchange Capacity</Text>
      </View>
    </View>
  );
};