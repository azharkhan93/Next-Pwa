import { View } from "@react-pdf/renderer";
import { styles } from "../RecordPDFTemplate.styles";
import { TestTableHeader } from "./TestTableHeader";
import { TestTableRow } from "./TestTableRow";
import type { TestParam } from "@/utils/pdf/types";

interface TestResultsTableProps {
  testParams: TestParam[];
}

export const TestResultsTable = ({ testParams }: TestResultsTableProps) => {
  return (
    <View style={styles.tablesContainer}>
      <View style={styles.table}>
        <TestTableHeader />
        {testParams.map((param) => (
          <TestTableRow key={param.name} param={param} />
        ))}
      </View>
    </View>
  );
};