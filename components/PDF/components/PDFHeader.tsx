import { View, Text, Image } from "@react-pdf/renderer";
import { styles } from "../RecordPDFTemplate.styles";
import { formatDate } from "../utils/formatHelpers";
import { RecordData } from "@/hooks/useRecords";

interface PDFHeaderProps {
  data: RecordData;
}

export const PDFHeader = ({ data }: PDFHeaderProps) => {
  return (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        <View style={styles.logoContainer}>
          <Image src="/static soil logo.jpeg" style={styles.logo} />
          <Text style={styles.companyName}>Static Soil Health Lab</Text>
        </View>
        <Text style={styles.addressColumn}>
          Location: S.D. Colony, Batmaloo, Srinagar
        </Text>
        <Text style={styles.addressColumn}>Contact: +918082837794</Text>
      </View>

      <View style={styles.headerRight}>
        <Text style={styles.reportTitle}>SOIL ANALYSIS</Text>
        <Text style={styles.infoRow}>Name: {data.name || "N/A"}</Text>
        <Text style={styles.infoRow}>
          Report No: {data.consumerId || "N/A"}
        </Text>
        <Text style={styles.infoRow}>
          Customer ID: {data.id?.slice(-5) || "N/A"}
        </Text>
        <Text style={styles.infoRow}>
          Date Printed: {formatDate(new Date().toISOString())}
        </Text>
        <Text style={styles.infoRow}>
          Date Received: {formatDate(data.createdAt)}
        </Text>
        
      </View>
    </View>
  );
};