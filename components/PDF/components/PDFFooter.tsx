import { View, Text, Image } from "@react-pdf/renderer";
import { styles } from "../RecordPDFTemplate.styles";

export const PDFFooter = () => {
  return (
    <View style={styles.footer}>
      <View style={styles.footerLeft}>
        <View style={styles.footerLogoContainer}>
          <Image src="/static soil logo.jpeg" style={styles.footerLogo} />
          <View>
            <Text style={styles.footerCompanyName}>
              Static Soil Health Lab
            </Text>
            <Text style={styles.footerText}>
              S.D. Colony, Batmaloo, Srinagar
            </Text>
            <Text style={styles.footerText}>Contact: +918082837794</Text>
          </View>
        </View>
      </View>
      <View style={styles.footerRight}>
        <Text style={styles.footerText}>
          Analysis prepared by: Static Soil Health Lab
        </Text>
        <Text style={styles.footerText}>
          S.D. Colony, Batmaloo, Srinagar
        </Text>
      </View>
    </View>
  );
};