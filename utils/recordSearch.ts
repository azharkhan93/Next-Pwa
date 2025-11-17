import { prisma } from "./prisma";

type RecordWithTestResults = {
  id: string;
  testResults: unknown;
  createdAt: Date;
  [key: string]: unknown;
};

/**
 * Search records by consumerId, phoneNo, or labTestNo
 * @param searchTerm - The search term to match against
 * @param page - Page number (1-indexed)
 * @param limit - Number of records per page
 * @returns Object containing records and total count
 */
export async function searchRecords(
  searchTerm: string,
  page: number,
  limit: number
): Promise<{ records: RecordWithTestResults[]; total: number }> {
  const skip = (page - 1) * limit;
  const trimmedSearch = searchTerm.trim();

  // First, get records matching consumerId or phoneNo
  const baseRecords = await prisma.record.findMany({
    where: {
      OR: [
        {
          consumerId: {
            contains: trimmedSearch,
            mode: "insensitive",
          },
        },
        {
          phoneNo: {
            contains: trimmedSearch,
            mode: "insensitive",
          },
        },
      ],
    },
    orderBy: { createdAt: "desc" },
  });

  // Also search in testResults for labTestNo
  const allRecords = await prisma.record.findMany({
    orderBy: { createdAt: "desc" },
  });

  // Filter records where testResults contains matching labTestNo
  const searchLower = trimmedSearch.toLowerCase();
  const filteredByTestResults = allRecords.filter((record) => {
    if (!record.testResults || !Array.isArray(record.testResults)) {
      return false;
    }
    return record.testResults.some((testResult: unknown) => {
      if (
        typeof testResult === "object" &&
        testResult !== null &&
        "labTestNo" in testResult
      ) {
        const labTestNo = String(
          (testResult as { labTestNo?: unknown }).labTestNo || ""
        ).toLowerCase();
        return labTestNo.includes(searchLower);
      }
      return false;
    });
  });

  // Combine and deduplicate
  const combinedRecords = [
    ...baseRecords,
    ...filteredByTestResults.filter(
      (r) => !baseRecords.some((br) => br.id === r.id)
    ),
  ];

  // Sort by createdAt desc
  combinedRecords.sort(
    (a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const total = combinedRecords.length;
  const records = combinedRecords.slice(skip, skip + limit);

  return { records, total };
}

/**
 * Get paginated records without search
 * @param page - Page number (1-indexed)
 * @param limit - Number of records per page
 * @returns Object containing records and total count
 */
export async function getPaginatedRecords(
  page: number,
  limit: number
): Promise<{ records: RecordWithTestResults[]; total: number }> {
  const skip = (page - 1) * limit;

  const [records, total] = await Promise.all([
    prisma.record.findMany({
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
    }),
    prisma.record.count(),
  ]);

  return { records, total };
}

