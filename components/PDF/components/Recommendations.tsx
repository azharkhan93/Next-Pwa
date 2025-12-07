import { View, Text } from "@react-pdf/renderer";
import { styles } from "../RecordPDFTemplate.styles";
import { RecommendationCard } from "./RecommendationCard";
import type { TestResult } from "@/utils/pdf/types";

interface RecommendationsProps {
  testResult: TestResult;
}

export const Recommendations = ({ testResult }: RecommendationsProps) => {
  const hasCustomRecommendations =
    testResult.nitrogenRecommendation ||
    testResult.phosphorusRecommendation ||
    testResult.potassiumRecommendation;

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Recommendations</Text>

      {hasCustomRecommendations ? (
        <>
          {testResult.nitrogenRecommendation && (
            <RecommendationCard
              icon="N"
              iconColor="#3b82f6"
              borderColor="#3b82f6"
              title={`Nitrogen (N) - ${testResult.nitrogenRecommendation.level}${
                testResult.nitrogenRecommendation.increasePercent !== null && 
                testResult.nitrogenRecommendation.increasePercent !== undefined &&
                testResult.nitrogenRecommendation.increasePercent > 0
                  ? ` (${testResult.nitrogenRecommendation.increasePercent}% increase recommended)`
                  : ""
              }`}
              content={
                testResult.nitrogenRecommendation.suggestion ||
                "Apply recommended nitrogen based on soil test results."
              }
            />
          )}

          {testResult.phosphorusRecommendation && (
            <RecommendationCard
              icon="P"
              iconColor="#10b981"
              borderColor="#10b981"
              title={`Phosphate (P₂O₅) - ${testResult.phosphorusRecommendation.level}${
                testResult.phosphorusRecommendation.increasePercent !== null && 
                testResult.phosphorusRecommendation.increasePercent !== undefined &&
                testResult.phosphorusRecommendation.increasePercent > 0
                  ? ` (${testResult.phosphorusRecommendation.increasePercent}% increase recommended)`
                  : ""
              }`}
              content={
                testResult.phosphorusRecommendation.suggestion ||
                "Apply recommended phosphate based on soil test results."
              }
            />
          )}

          {testResult.potassiumRecommendation && (
            <RecommendationCard
              icon="K"
              iconColor="#f59e0b"
              borderColor="#f59e0b"
              title={`Potash (K₂O) - ${testResult.potassiumRecommendation.level}${
                testResult.potassiumRecommendation.increasePercent !== null && 
                testResult.potassiumRecommendation.increasePercent !== undefined &&
                testResult.potassiumRecommendation.increasePercent > 0
                  ? ` (${testResult.potassiumRecommendation.increasePercent}% increase recommended)`
                  : ""
              }`}
              content={
                testResult.potassiumRecommendation.suggestion ||
                "Apply recommended potash based on soil test results."
              }
            />
          )}
        </>
      ) : (
        <>
          <RecommendationCard
            icon="N"
            iconColor="#3b82f6"
            borderColor="#3b82f6"
            title="Nitrogen (N) Application"
            content={
              <Text style={styles.recommendationText}>
                <Text style={styles.recommendationBold}>MAINTENANCE:</Text>{" "}
                Apply 0.75 to 1 lb N/1000 sq ft in March, May, September, and
                November. Adjust N rate and timing to accommodate climatic
                conditions and management practices. If lower maintenance is
                desired, the May application can be eliminated.
              </Text>
            }
          />

          <RecommendationCard
            icon="P"
            iconColor="#10b981"
            borderColor="#10b981"
            title="Phosphate (P₂O₅) Application"
            content="Apply half of recommended phosphate in spring and again in fall."
          />

          <RecommendationCard
            icon="K"
            iconColor="#f59e0b"
            borderColor="#f59e0b"
            title="Potash (K₂O) Application"
            content="Apply recommended potash in fall. If the soil is sandy, apply 1 lb of potash/1000 sq ft in fall and apply the remaining potash in several smaller applications throughout the growing season."
          />
        </>
      )}
    </View>
  );
};