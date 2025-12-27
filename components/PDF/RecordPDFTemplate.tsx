import { Document, Page } from "@react-pdf/renderer";
import { RecordData } from "@/hooks/useRecords";
import { styles } from "./RecordPDFTemplate.styles";
import { PDFHeader } from "./components/PDFHeader";
import { TestResultsTable } from "./components/TestResultsTable";
import { Recommendations } from "./components/Recommendations";
import { PDFFooter } from "./components/PDFFooter";
import { getTestParams } from "./utils/parameterHelpers";
import type { TestResult } from "@/utils/pdf/types";

export const RecordPDFTemplate = ({ data }: { data: RecordData }) => {
  const testResult: TestResult = data.testResults?.[0] || {};
  const testParams = getTestParams(testResult);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <PDFHeader data={data} />
        <TestResultsTable testParams={testParams} />
        <Recommendations testResult={testResult} data={data} />
        <PDFFooter />
      </Page>
    </Document>
  );
};