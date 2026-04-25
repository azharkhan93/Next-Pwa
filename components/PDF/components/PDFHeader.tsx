import { View, Text, Image } from "@react-pdf/renderer";
import { styles } from "../RecordPDFTemplate.styles";
import { formatDate } from "../utils/formatHelpers";
import { RecordData } from "@/hooks/useRecords";

interface PDFHeaderProps {
  data: RecordData;
  qrCodeDataUrl?: string;
}

export const PDFHeader = ({ data, qrCodeDataUrl }: PDFHeaderProps) => {
  return (
    <View style={{ marginBottom: 20 }}>
      {/* Top Header Row */}
      <View style={[styles.header, { alignItems: "flex-start", borderBottom: "none", marginBottom: 12 }]}>
        {/* Logo Section (Left) */}
        <View style={{ width: "25%" }}>
          <View style={styles.logoContainer}>
            <Image src="/soil2.png" style={styles.logo} />
          </View>
          <Text style={[styles.companyName, { fontSize: 9 }]}>Static Soil Health Lab</Text>
          <Text style={[styles.slogan, { fontSize: 6.5, marginTop: 1 }]}>A Scientific Approach to Soil Health</Text>
          <View style={{ marginTop: 4 }}>
            <Text style={[styles.addressColumn, { fontSize: 6 }]}>S.D. Colony, Batmaloo, Srinagar</Text>
            <Text style={[styles.addressColumn, { fontSize: 6 }]}>Contact: +91 80828 37794</Text>
          </View>
        </View>

        {/* Info Grid (Center/Right) */}
        <View style={{ width: "60%", paddingLeft: 15 }}>
          <Text style={[styles.reportTitle, { textAlign: "right", marginBottom: 12, fontSize: 10 }]}>SOIL ANALYSIS REPORT</Text>
          
          <View style={{
            flexDirection: "row",
            flexWrap: "wrap",
            width: "100%",
            rowGap: 6,
            columnGap: 12,
            justifyContent: "flex-end"
          }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontSize: 6, color: "#4b5563", fontWeight: "bold", fontFamily: "Times-Bold" }}>Name: </Text>
              <Text style={[styles.valueText, { fontSize: 7, color: "#000000" }]}>{data.name || "N/A"}</Text>
            </View>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontSize: 6, color: "#4b5563", fontWeight: "bold", fontFamily: "Times-Bold" }}>District: </Text>
              <Text style={[styles.valueText, { fontSize: 7, color: "#000000" }]}>{data.district || "N/A"}</Text>
            </View>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontSize: 6, color: "#4b5563", fontWeight: "bold", fontFamily: "Times-Bold" }}>Crop: </Text>
              <Text style={[styles.valueText, { fontSize: 7, color: "#000000" }]}>{data.crop || data.cropOther || "N/A"}</Text>
            </View>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontSize: 6, color: "#4b5563", fontWeight: "bold", fontFamily: "Times-Bold" }}>Age: </Text>
              <Text style={[styles.valueText, { fontSize: 7, color: "#000000" }]}>{data.age ? `${data.age} Years` : "N/A"}</Text>
            </View>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontSize: 6, color: "#4b5563", fontWeight: "bold", fontFamily: "Times-Bold" }}>Report No: </Text>
              <Text style={[styles.valueText, { fontSize: 7, color: "#000000" }]}>{data.consumerId || "N/A"}</Text>
            </View>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontSize: 6, color: "#4b5563", fontWeight: "bold", fontFamily: "Times-Bold" }}>ID: </Text>
              <Text style={[styles.valueText, { fontSize: 7, color: "#000000" }]}>{data.id?.slice(-5).toUpperCase() || "N/A"}</Text>
            </View>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontSize: 6, color: "#4b5563", fontWeight: "bold", fontFamily: "Times-Bold" }}>Printed: </Text>
              <Text style={[styles.valueText, { fontSize: 7, color: "#000000" }]}>{formatDate(new Date().toISOString())}</Text>
            </View>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontSize: 6, color: "#4b5563", fontWeight: "bold", fontFamily: "Times-Bold" }}>Received: </Text>
              <Text style={[styles.valueText, { fontSize: 7, color: "#000000" }]}>{formatDate(data.createdAt || new Date().toISOString())}</Text>
            </View>
          </View>
        </View>

        {/* Minimalist QR Code (Far Right) */}
        {qrCodeDataUrl && (
          <View style={{ width: "15%", alignItems: "flex-end", justifyContent: "flex-start", paddingTop: 2 }}>
            <Image 
              src={qrCodeDataUrl} 
              style={{ 
                width: 45, 
                height: 45, 
                border: "0.5 solid #e5e7eb",
                padding: 2,
                borderRadius: 4
              }} 
            />
          </View>
        )}
      </View>
    </View>
  );
};