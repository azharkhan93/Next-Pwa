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
      <View style={styles.rangeCell}>
        <Text style={[styles.headerCell, { marginBottom: 2 }]}>
          SOIL TEST RATINGS
        </Text>
        <RatingHeader />
      </View>
      <View style={[styles.cecCell,]}>
        <Text style={styles.headerCell}>Cation Exchange Value</Text>
      </View>
    </View>
  );
};