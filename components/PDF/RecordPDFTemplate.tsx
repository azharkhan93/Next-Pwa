import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { RecordData } from '@/hooks/useRecords';
import { 
  getParameterRanges,
  getRatingColor,
  getPhRating,
  getOrganicCarbonRating,
  getCalciumRating,
  getMagnesiumRating,
  getSulfurRating,
  getIronRating,
  getManganeseRating,
  getZincRating,
  getCopperRating,
  getBoronRating,
  getMolybdenumRating,
  getChlorineRating,
  getNickelRating,
  getSodiumRating,
  getElectricalConductivityRating
} from '@/utils/pdfChartColors';
import {
  getNitrogenRating,
  getPhosphorusRating,
  getPotassiumRating
} from '@/utils/soilRating';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 10,
    fontFamily: 'Times-Roman',
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    borderBottom: '2 solid #dc2626',
    paddingBottom: 12,
  },
  headerLeft: {
    width: '50%',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  logo: {
    width: 30,
    height: 30,
    backgroundColor: '#dc2626',
    borderRadius: 3,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  companyName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#dc2626',
    fontFamily: 'Times-Bold',
  },
  addressColumn: {
    fontSize: 8,
    color: '#374151',
    lineHeight: 1.5,
    marginBottom: 1,
  },
  slogan: {
    fontSize: 9,
    color: '#6b7280',
    fontStyle: 'italic',
    marginTop: 5,
  },
  headerRight: {
    width: '45%',
    alignItems: 'flex-end',
  },
  reportTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
    fontFamily: 'Times-Bold',
  },
  infoRow: {
    fontSize: 8,
    color: '#374151',
    marginBottom: 3,
    textAlign: 'right',
  },
  generalInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    padding: 8,
    backgroundColor: '#f9fafb',
    borderRadius: 3,
  },
  generalInfoLeft: {
    width: '30%',
  },
  generalInfoCenter: {
    width: '35%',
  },
  generalInfoRight: {
    width: '30%',
  },
  growerBox: {
    padding: 6,
    backgroundColor: '#ffffff',
    border: '1 solid #e5e7eb',
    borderRadius: 2,
    marginTop: 4,
  },
  growerText: {
    fontSize: 8,
    color: '#111827',
  },
  labelText: {
    fontSize: 8,
    color: '#6b7280',
    marginBottom: 3,
  },
  valueText: {
    fontSize: 9,
    color: '#111827',
    fontWeight: 'bold',
  },
  table: {
    marginTop: 10,
    border: '1 solid #000000',
    overflow: 'hidden',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f3f4f6',
    borderBottom: '2 solid #000000',
    paddingVertical: 8,
    paddingHorizontal: 8,
    alignItems: 'flex-start',
  },
  headerCell: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#000000',
    fontFamily: 'Times-Bold',
  },
  testCell: {
    width: '12%',
    paddingRight: 4,
    paddingLeft: 4,
    borderRight: '1 solid #d1d5db',
  },
  methodCell: {
    width: '8%',
    textAlign: 'center',
    paddingHorizontal: 2,
    borderRight: '1 solid #d1d5db',
  },
  resultsCell: {
    width: '10%',
    textAlign: 'center',
    paddingHorizontal: 2,
    borderRight: '1 solid #d1d5db',
  },
  rangeCell: {
    width: '50%',
    paddingLeft: 8,
    paddingRight: 4,
    flexDirection: 'column',
    borderRight: '1 solid #d1d5db',
  },
  additionalCell: {
    width: '20%',
    paddingLeft: 8,
    paddingRight: 4,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottom: '1 solid #d1d5db',
    paddingVertical: 10,
    paddingHorizontal: 8,
    alignItems: 'center',
    minHeight: 45,
  },
  testName: {
    fontSize: 9,
    color: '#000000',
    fontWeight: 'bold',
    fontFamily: 'Times-Bold',
  },
  methodText: {
    fontSize: 9,
    color: '#000000',
    textAlign: 'center',
    fontFamily: 'Times-Roman',
  },
  resultText: {
    fontSize: 9,
    color: '#000000',
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: 'Times-Bold',
  },
  ratingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 4,
    paddingHorizontal: 2,
  },
  ratingLabel: {
    fontSize: 7,
    color: '#000000',
    fontWeight: 'bold',
    fontFamily: 'Times-Bold',
  },
  barContainer: {
    height: 16,
    position: 'relative',
    backgroundColor: '#ffffff',
    borderRadius: 1,
    overflow: 'hidden',
    border: '1 solid #000000',
    width: '100%',
  },
  barSegment: {
    height: '100%',
    position: 'absolute',
    top: 0,
  },
  barIndicator: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 2,
    backgroundColor: '#000000',
    zIndex: 10,
  },
  section: {
    marginTop: 15,
    padding: 10,
    backgroundColor: '#f9fafb',
    borderRadius: 3,
    border: '1 solid #e5e7eb',
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
    fontFamily: 'Times-Bold',
  },
  sectionText: {
    fontSize: 9,
    color: '#374151',
    marginBottom: 5,
  },
  saturationTable: {
    marginTop: 8,
    border: '1 solid #d1d5db',
  },
  saturationRow: {
    flexDirection: 'row',
    borderBottom: '1 solid #e5e7eb',
    paddingVertical: 4,
    paddingHorizontal: 6,
  },
  saturationCell: {
    fontSize: 8,
    color: '#111827',
    width: '20%',
  },
  footer: {
    position: 'absolute',
    bottom: 15,
    left: 30,
    right: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 7,
    color: '#9ca3af',
    borderTop: '1 solid #e5e7eb',
    paddingTop: 8,
  },
  footerLeft: {
    width: '50%',
  },
  footerRight: {
    width: '50%',
    textAlign: 'right',
  },
});


interface TestResult {
  // Basic Parameters
  ph?: string;
  organicCarbon?: string;
  // Primary Macronutrients
  nitrogen?: string;
  phosphorus?: string;
  potassium?: string;
  // Secondary Macronutrients
  calcium?: string;
  magnesium?: string;
  sulfur?: string;
  // Micronutrients
  iron?: string;
  manganese?: string;
  zinc?: string;
  copper?: string;
  boron?: string;
  molybdenum?: string;
  chlorine?: string;
  nickel?: string;
  // Other Parameters
  sodium?: string;
  electricalConductivity?: string;
}

const renderRatingHeader = () => {
  return (
    <View style={styles.ratingHeader}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 8 }}>
          <View style={{ width: 8, height: 8, backgroundColor: '#dc2626', border: '0.5 solid #000', marginRight: 3 }} />
          <Text style={styles.ratingLabel}>Very Low</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 8 }}>
          <View style={{ width: 8, height: 8, backgroundColor: '#f59e0b', border: '0.5 solid #000', marginRight: 3 }} />
          <Text style={styles.ratingLabel}>Low</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 8 }}>
          <View style={{ width: 8, height: 8, backgroundColor: '#eab308', border: '0.5 solid #000', marginRight: 3 }} />
          <Text style={styles.ratingLabel}>Medium</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 8 }}>
          <View style={{ width: 8, height: 8, backgroundColor: '#22c55e', border: '0.5 solid #000', marginRight: 3 }} />
          <Text style={styles.ratingLabel}>Optimum</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ width: 8, height: 8, backgroundColor: '#16a34a', border: '0.5 solid #000', marginRight: 3 }} />
          <Text style={styles.ratingLabel}>Very High</Text>
        </View>
      </View>
    </View>
  );
};

const renderBarChart = (value: number, param: string) => {
  const ranges = getParameterRanges(param);
  const totalRange = ranges.max - ranges.min;
  const valuePosition = Math.min(Math.max(((value - ranges.min) / totalRange) * 100, 0), 100);

  return (
    <View style={styles.barContainer}>
      {/* Render color segments */}
      {ranges.ranges.map((range, idx) => {
        const segmentMin = ((range.min - ranges.min) / totalRange) * 100;
        const segmentMax = ((range.max - ranges.min) / totalRange) * 100;
        const segmentWidth = segmentMax - segmentMin;
        const color = getRatingColor(range.level);

        return (
          <View
            key={idx}
            style={[
              styles.barSegment,
              {
                left: `${segmentMin}%`,
                width: `${segmentWidth}%`,
                backgroundColor: color,
                borderRight: idx < ranges.ranges.length - 1 ? '0.5 solid #000000' : 'none',
              },
            ]}
          />
        );
      })}
      
      {/* Value indicator line */}
      <View
        style={[
          styles.barIndicator,
          {
            left: `${valuePosition}%`,
          },
        ]}
      />
    </View>
  );
};

export const RecordPDFTemplate = ({ data }: { data: RecordData }) => {
  const formatDate = (dateString?: string) => {
    if (!dateString) return new Date().toLocaleDateString();
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  // Get first test result or use dummy data
  const testResult: TestResult = data.testResults?.[0] || {
    ph: '7.2',
    organicCarbon: '0.8',
    nitrogen: '200',
    phosphorus: '15',
    potassium: '150',
    calcium: '1200',
    magnesium: '300',
    sulfur: '10',
    iron: '5.2',
    manganese: '8.5',
    zinc: '1.2',
    copper: '0.8',
    boron: '0.5',
    molybdenum: '0.1',
    chlorine: '15',
    nickel: '0.3',
    sodium: '25',
    electricalConductivity: '0.5',
  };

  // Parse values
  const ph = testResult.ph ? parseFloat(testResult.ph) : null;
  const oc = testResult.organicCarbon ? parseFloat(testResult.organicCarbon) : null;
  const n = testResult.nitrogen ? parseFloat(testResult.nitrogen) : null;
  const p = testResult.phosphorus ? parseFloat(testResult.phosphorus) : null;
  const k = testResult.potassium ? parseFloat(testResult.potassium) : null;
  const ca = testResult.calcium ? parseFloat(testResult.calcium) : null;
  const mg = testResult.magnesium ? parseFloat(testResult.magnesium) : null;
  const s = testResult.sulfur ? parseFloat(testResult.sulfur) : null;
  const fe = testResult.iron ? parseFloat(testResult.iron) : null;
  const mn = testResult.manganese ? parseFloat(testResult.manganese) : null;
  const zn = testResult.zinc ? parseFloat(testResult.zinc) : null;
  const cu = testResult.copper ? parseFloat(testResult.copper) : null;
  const b = testResult.boron ? parseFloat(testResult.boron) : null;
  const mo = testResult.molybdenum ? parseFloat(testResult.molybdenum) : null;
  const cl = testResult.chlorine ? parseFloat(testResult.chlorine) : null;
  const ni = testResult.nickel ? parseFloat(testResult.nickel) : null;
  const na = testResult.sodium ? parseFloat(testResult.sodium) : null;
  const ec = testResult.electricalConductivity ? parseFloat(testResult.electricalConductivity) : null;

  const testParams = [
    // Basic Parameters
    { name: 'Soil pH', value: ph, unit: '', method: '1:1', param: 'ph', category: 'Basic Parameters' },
    { name: 'Organic Matter', value: oc, unit: '%', method: 'LOI', param: 'organicCarbon', category: 'Basic Parameters' },
    // Primary Macronutrients
    { name: 'Nitrogen (N)', value: n, unit: ' Kg/ha', method: 'M3', param: 'nitrogen', category: 'Primary Macronutrients' },
    { name: 'Phosphorus (P)', value: p, unit: ' ppm', method: 'M3', param: 'phosphorus', category: 'Primary Macronutrients' },
    { name: 'Potassium (K)', value: k, unit: ' ppm', method: 'M3', param: 'potassium', category: 'Primary Macronutrients' },
    // Secondary Macronutrients
    { name: 'Calcium (Ca)', value: ca, unit: ' ppm', method: 'M3', param: 'calcium', category: 'Secondary Macronutrients' },
    { name: 'Magnesium (Mg)', value: mg, unit: ' ppm', method: 'M3', param: 'magnesium', category: 'Secondary Macronutrients' },
    { name: 'Sulfur (S)', value: s, unit: ' ppm', method: 'M3', param: 'sulfur', category: 'Secondary Macronutrients' },
    // Micronutrients
    { name: 'Iron (Fe)', value: fe, unit: ' ppm', method: 'M3', param: 'iron', category: 'Micronutrients' },
    { name: 'Manganese (Mn)', value: mn, unit: ' ppm', method: 'M3', param: 'manganese', category: 'Micronutrients' },
    { name: 'Zinc (Zn)', value: zn, unit: ' ppm', method: 'M3', param: 'zinc', category: 'Micronutrients' },
    { name: 'Copper (Cu)', value: cu, unit: ' ppm', method: 'M3', param: 'copper', category: 'Micronutrients' },
    { name: 'Boron (B)', value: b, unit: ' ppm', method: 'M3', param: 'boron', category: 'Micronutrients' },
    { name: 'Molybdenum (Mo)', value: mo, unit: ' ppm', method: 'M3', param: 'molybdenum', category: 'Micronutrients' },
    { name: 'Chlorine (Cl)', value: cl, unit: ' ppm', method: 'M3', param: 'chlorine', category: 'Micronutrients' },
    { name: 'Nickel (Ni)', value: ni, unit: ' ppm', method: 'M3', param: 'nickel', category: 'Micronutrients' },
    // Other Parameters
    { name: 'Sodium (Na)', value: na, unit: ' ppm', method: 'M3', param: 'sodium', category: 'Other Parameters' },
    { name: 'Electrical Conductivity (EC)', value: ec, unit: ' dS/m', method: 'EC', param: 'electricalConductivity', category: 'Other Parameters' },
  ];

  // Calculate CEC and saturation (simplified calculations)
  const cec = ca && mg && k ? (ca / 200 + mg / 120 + k / 390) * 10 : 11.1;
  const kSaturation = k && cec ? ((k / 390) / cec) * 100 : 4.6;
  const caSaturation = ca && cec ? ((ca / 200) / cec) * 100 : 80.0;
  const mgSaturation = mg && cec ? ((mg / 120) / cec) * 100 : 12.8;
  
  // Calculate ratios
  const kMgRatio = k && mg ? (k / 390) / (mg / 120) : 0.36;
  const caMgRatio = ca && mg ? (ca / 200) / (mg / 120) : 6.25;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            {/* Logo and Company Name */}
            <View style={styles.logoContainer}>
              <View style={styles.logo}>
                <Text style={styles.logoText}>W</Text>
              </View>
              <Text style={styles.companyName}>Waypoint ANALYTICAL</Text>
            </View>
            {/* Address in column format */}
            <Text style={styles.addressColumn}>2790 Whitten Road, Memphis, TN 38133</Text>
            <Text style={styles.addressColumn}>Main 901.213.2400</Text>
            <Text style={styles.addressColumn}>Fax 901.213.2440</Text>
            <Text style={styles.addressColumn}>www.waypointanalytical.com</Text>
            <Text style={styles.slogan}>Every acre...Every year</Text>
          </View>
          
          <View style={styles.headerRight}>
            <Text style={styles.reportTitle}>SOIL ANALYSIS</Text>
            <Text style={styles.infoRow}>Report No: {data.consumerId || '24-260-1454'}</Text>
            <Text style={styles.infoRow}>Cust No: {data.id?.slice(-5) || '33177'}</Text>
            <Text style={styles.infoRow}>Date Printed: {formatDate(new Date().toISOString())}</Text>
            <Text style={styles.infoRow}>Date Received: {formatDate(data.createdAt)}</Text>
            <Text style={styles.infoRow}>PO:</Text>
            <Text style={styles.infoRow}>Page: 1 of 1</Text>
          </View>
        </View>

        {/* General Information */}
        <View style={styles.generalInfo}>
          <View style={styles.generalInfoLeft}>
            <Text style={styles.labelText}>Lab No:</Text>
            <Text style={styles.valueText}>{data.consumerId || '27306'}</Text>
          </View>
          <View style={styles.generalInfoCenter}>
            <Text style={styles.labelText}>Grower:</Text>
            <View style={styles.growerBox}>
              <Text style={styles.growerText}>{data.name || 'Grower not listed'}</Text>
            </View>
          </View>
          <View style={styles.generalInfoRight}>
            <Text style={styles.labelText}>Field:</Text>
            <Text style={styles.valueText}>{data.khasraNo || ''}</Text>
            <Text style={[styles.labelText, { marginTop: 8 }]}>Sample ID:</Text>
            <Text style={styles.valueText}>{data.location || 'Front M'}</Text>
          </View>
        </View>

        {/* Test Results Table */}
        <View style={styles.table}>
          {/* Table Header */}
          <View style={styles.tableHeader}>
            <View style={styles.testCell}>
              <Text style={styles.headerCell}>Test</Text>
            </View>
            <View style={styles.methodCell}>
              <Text style={styles.headerCell}>Method</Text>
            </View>
            <View style={styles.resultsCell}>
              <Text style={styles.headerCell}>Results</Text>
            </View>
            <View style={styles.rangeCell}>
              <Text style={[styles.headerCell, { marginBottom: 2 }]}>SOIL TEST RATINGS</Text>
              {renderRatingHeader()}
            </View>
            <View style={styles.additionalCell}>
              <Text style={styles.headerCell}>Rating</Text>
            </View>
          </View>

          {/* Table Rows */}
          {testParams.map((param) => {
            if (param.value === null) return null;
            
            // Get rating for display
            let rating = 'N/A';
            if (param.param === 'ph') {
              rating = getPhRating(param.value);
            } else if (param.param === 'nitrogen') {
              const nRating = getNitrogenRating(param.value);
              rating = nRating === 'High' ? 'Optimum' : nRating;
            } else if (param.param === 'phosphorus') {
              const pRating = getPhosphorusRating(param.value);
              rating = pRating === 'High' ? 'Optimum' : pRating;
            } else if (param.param === 'potassium') {
              const kRating = getPotassiumRating(param.value);
              rating = kRating === 'High' ? 'Optimum' : kRating;
            } else if (param.param === 'calcium') {
              rating = getCalciumRating(param.value);
            } else if (param.param === 'magnesium') {
              rating = getMagnesiumRating(param.value);
            } else if (param.param === 'organicCarbon') {
              rating = getOrganicCarbonRating(param.value);
            } else if (param.param === 'sulfur') {
              rating = getSulfurRating(param.value);
            } else if (param.param === 'iron') {
              rating = getIronRating(param.value);
            } else if (param.param === 'manganese') {
              rating = getManganeseRating(param.value);
            } else if (param.param === 'zinc') {
              rating = getZincRating(param.value);
            } else if (param.param === 'copper') {
              rating = getCopperRating(param.value);
            } else if (param.param === 'boron') {
              rating = getBoronRating(param.value);
            } else if (param.param === 'molybdenum') {
              rating = getMolybdenumRating(param.value);
            } else if (param.param === 'chlorine') {
              rating = getChlorineRating(param.value);
            } else if (param.param === 'nickel') {
              rating = getNickelRating(param.value);
            } else if (param.param === 'sodium') {
              rating = getSodiumRating(param.value);
            } else if (param.param === 'electricalConductivity') {
              rating = getElectricalConductivityRating(param.value);
            }
            
            return (
              <View key={param.name} style={styles.tableRow}>
                <View style={styles.testCell}>
                  <Text style={styles.testName}>{param.name}</Text>
                </View>
                <View style={styles.methodCell}>
                  <Text style={styles.methodText}>{param.method}</Text>
                </View>
                <View style={styles.resultsCell}>
                  <Text style={styles.resultText}>
                    {param.value.toFixed(param.name === 'Soil pH' ? 1 : param.name === 'Organic Matter' ? 1 : 0)}{param.unit}
                  </Text>
                </View>
                <View style={styles.rangeCell}>
                  {renderBarChart(param.value, param.param)}
                </View>
                <View style={styles.additionalCell}>
                  <Text style={[styles.resultText, { textAlign: 'left' }]}>{rating}</Text>
                </View>
              </View>
            );
          })}
        </View>

        {/* Calculated Cation Exchange Capacity & %Saturation */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Calculated Cation Exchange Capacity & %Saturation</Text>
          <Text style={styles.sectionText}>Calculated Cation Exchange Capacity: {cec.toFixed(1)} meq/100g</Text>
          
          <View style={styles.saturationTable}>
            <View style={[styles.saturationRow, { backgroundColor: '#f3f4f6' }]}>
              <Text style={[styles.saturationCell, { fontWeight: 'bold' }]}>Element</Text>
              <Text style={[styles.saturationCell, { fontWeight: 'bold' }]}>%Sat</Text>
              <Text style={[styles.saturationCell, { fontWeight: 'bold' }]}>meq</Text>
            </View>
            <View style={styles.saturationRow}>
              <Text style={styles.saturationCell}>K:</Text>
              <Text style={styles.saturationCell}>{kSaturation.toFixed(1)} %sat</Text>
              <Text style={styles.saturationCell}>{(kSaturation * cec / 100).toFixed(1)} meq</Text>
            </View>
            <View style={styles.saturationRow}>
              <Text style={styles.saturationCell}>Ca:</Text>
              <Text style={styles.saturationCell}>{caSaturation.toFixed(1)} %sat</Text>
              <Text style={styles.saturationCell}>{(caSaturation * cec / 100).toFixed(1)} meq</Text>
            </View>
            <View style={styles.saturationRow}>
              <Text style={styles.saturationCell}>Mg:</Text>
              <Text style={styles.saturationCell}>{mgSaturation.toFixed(1)} %sat</Text>
              <Text style={styles.saturationCell}>{(mgSaturation * cec / 100).toFixed(1)} meq</Text>
            </View>
          </View>
        </View>

        {/* Ratios */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ratios</Text>
          <Text style={styles.sectionText}>K/Mg Ratio: {kMgRatio.toFixed(2)}</Text>
          <Text style={styles.sectionText}>Ca/Mg Ratio: {caMgRatio.toFixed(2)}</Text>
        </View>

        {/* Soil Fertility Guidelines */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>SOIL FERTILITY GUIDELINES</Text>
          <Text style={styles.sectionText}>Yield Goal: 1</Text>
          <Text style={styles.sectionText}>Optimum Rec Units: LB/1000 SF</Text>
          <Text style={[styles.sectionText, { marginTop: 8, fontWeight: 'bold' }]}>Crop: {data.crop || 'Fescue/Cool Season Lawn'}</Text>
          
          <View style={[styles.saturationTable, { marginTop: 8 }]}>
            <View style={[styles.saturationRow, { backgroundColor: '#f3f4f6' }]}>
              <Text style={[styles.saturationCell, { fontWeight: 'bold' }]}>Nutrient</Text>
              <Text style={[styles.saturationCell, { fontWeight: 'bold' }]}>Amount</Text>
            </View>
            <View style={styles.saturationRow}>
              <Text style={styles.saturationCell}>(lbs) LIME (tons):</Text>
              <Text style={styles.saturationCell}>0</Text>
            </View>
            <View style={styles.saturationRow}>
              <Text style={styles.saturationCell}>N:</Text>
              <Text style={styles.saturationCell}>4.0</Text>
            </View>
            <View style={styles.saturationRow}>
              <Text style={styles.saturationCell}>P2O5:</Text>
              <Text style={styles.saturationCell}>0</Text>
            </View>
            <View style={styles.saturationRow}>
              <Text style={styles.saturationCell}>K2O:</Text>
              <Text style={styles.saturationCell}>1.0</Text>
            </View>
          </View>
        </View>

        {/* Comments/Recommendations */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Comments:</Text>
          <Text style={[styles.sectionText, { lineHeight: 1.6 }]}>
            <Text style={{ fontWeight: 'bold' }}>MAINTENANCE:</Text> Apply 0.75 to 1 lb N/1000 sq ft in March, May, September, and November. 
            Adjust N rate and timing to accommodate climatic conditions and management practices. 
            If lower maintenance is desired, the May application can be eliminated.{'\n\n'}
            Apply half of recommended phosphate in spring and again in fall.{'\n\n'}
            Apply recommended potash in fall. If the soil is sandy, apply 1 lb of potash/1000 sq ft in fall 
            and apply the remaining potash in several smaller applications throughout the growing season.
          </Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.footerLeft}>
            <Text>M3 - Mehlich 3 | BPH - Lime Index | LOI - Loss On Ignition | 1:1 - Water pH</Text>
          </View>
          <View style={styles.footerRight}>
            <Text>Analysis prepared by: Waypoint Analytical Tennessee, Inc.</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

