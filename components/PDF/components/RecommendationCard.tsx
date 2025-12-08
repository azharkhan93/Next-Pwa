import { View, Text } from "@react-pdf/renderer";
import { styles } from "../RecordPDFTemplate.styles";
import { JSX } from "react";

type RecommendationCardProps = {
  icon: string;
  iconColor: string;
  borderColor: string;
  title: string;
  content: string | JSX.Element;
};

export const RecommendationCard = ({
  icon,
  iconColor,
  borderColor,
  title,
  content,
}: RecommendationCardProps) => {
  return (
    <View style={[styles.recommendationCard, { borderLeftColor: borderColor }]}>
      <View style={styles.recommendationHeader}>
        <View
          style={[styles.recommendationIcon, { backgroundColor: iconColor }]}
        >
          <Text style={styles.recommendationIconText}>{icon}</Text>
        </View>
        <Text style={styles.recommendationTitle}>{title}</Text>
      </View>
      <View style={styles.recommendationContent}>
        {typeof content === "string" ? (
          <Text style={styles.recommendationText}>{content}</Text>
        ) : (
          content
        )}
      </View>
    </View>
  );
};
