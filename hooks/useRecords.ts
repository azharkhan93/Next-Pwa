import { useState, useEffect, useCallback } from "react";
import axios from "axios";

export type RecordData = {
  id?: string;
  consumerId?: string;
  name: string;
  parentage?: string;
  address?: string;
  district?: string;
  pinCode?: string;
  phoneNo?: string;
  adharNo?: string;
  khasraNo?: string;
  latitude?: string;
  longitude?: string;
  location?: string;
  city?: string;
  stateVal?: string;
  crop?: string;
  cropOther?: string;
  plantationType?: string;
  plantationTypeOther?: string;
  age?: number | "";
  noTrees?: number | "";
  area?: number | "";
  noOfSamples?: number | "";
  soilDepth?: string;
  soilType?: string;
  soilTypeOther?: string;
  drainage?: string;
  drainageOther?: string;
  irrigationMethod?: string;
  irrigationMethodOther?: string;
  paramPh?: boolean;
  paramDl?: boolean;
  paramCl?: boolean;
  ph?: string;
  organicCarbon?: string;
  nitrogen?: string;
  phosphorus?: string;
  potassium?: string;
  calcium?: string;
  magnesium?: string;
  nitrogenRating?: string;
  phosphorusRating?: string;
  potassiumRating?: string;
  testResults?: Array<{
    id: string;
    labTestNo?: string;
    ph: string;
    organicCarbon: string;
    nitrogen: string;
    phosphorus: string;
    potassium: string;
    calcium: string;
    magnesium: string;
    nitrogenRating?: string;
    phosphorusRating?: string;
    potassiumRating?: string;
  }>;
  createdAt?: string;
  updatedAt?: string;
};

type UseRecordsOptions = {
  page?: number;
  limit?: number;
  autoFetch?: boolean;
};

type UseRecordsReturn = {
  records: RecordData[];
  loading: boolean;
  error: string | null;
  total: number;
  totalPages: number;
  currentPage: number;
  fetchRecords: (options?: UseRecordsOptions) => Promise<void>;
  createRecord: (data: RecordData) => Promise<RecordData | null>;
  updateRecord: (id: string, data: Partial<RecordData>) => Promise<RecordData | null>;
  deleteRecord: (id: string) => Promise<boolean>;
  getRecordById: (id: string) => Promise<RecordData | null>;
  refetch: () => Promise<void>;
};

export function useRecords(
  initialOptions: UseRecordsOptions = {}
): UseRecordsReturn {
  const [records, setRecords] = useState<RecordData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(initialOptions.page || 1);

  const fetchRecords = useCallback(
    async (options: UseRecordsOptions = {}) => {
      setLoading(true);
      setError(null);
      try {
        const page = options.page || currentPage;
        const limit = options.limit || initialOptions.limit || 10;

        const response = await axios.get("/api/records", {
          params: { page, limit },
        });

        setRecords(response.data.data || []);
        setTotal(response.data.pagination?.total || 0);
        setTotalPages(response.data.pagination?.totalPages || 0);
        setCurrentPage(response.data.pagination?.page || page);
      } catch (err) {
        setError(
          axios.isAxiosError(err)
            ? err.response?.data?.error || err.message
            : "Failed to fetch records"
        );
        setRecords([]);
      } finally {
        setLoading(false);
      }
    },
    [currentPage, initialOptions.limit]
  );

  const createRecord = useCallback(
    async (data: RecordData): Promise<RecordData | null> => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.post("/api/records", data);
        return response.data.data;
      } catch (err) {
        setError(
          axios.isAxiosError(err)
            ? err.response?.data?.error || err.message
            : "Failed to create record"
        );
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const updateRecord = useCallback(
    async (id: string, data: Partial<RecordData>): Promise<RecordData | null> => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.put(`/api/records/${id}`, data);
        return response.data.data;
      } catch (err) {
        setError(
          axios.isAxiosError(err)
            ? err.response?.data?.error || err.message
            : "Failed to update record"
        );
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const deleteRecord = useCallback(async (id: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await axios.delete(`/api/records/${id}`);
      return true;
    } catch (err) {
      setError(
        axios.isAxiosError(err)
          ? err.response?.data?.error || err.message
          : "Failed to delete record"
      );
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const getRecordById = useCallback(
    async (id: string): Promise<RecordData | null> => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`/api/records/${id}`);
        return response.data.data;
      } catch (err) {
        setError(
          axios.isAxiosError(err)
            ? err.response?.data?.error || err.message
            : "Failed to fetch record"
        );
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const refetch = useCallback(() => {
    return fetchRecords({ page: currentPage });
  }, [fetchRecords, currentPage]);

  // Auto-fetch on mount if enabled
  useEffect(() => {
    if (initialOptions.autoFetch !== false) {
      fetchRecords(initialOptions);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    records,
    loading,
    error,
    total,
    totalPages,
    currentPage,
    fetchRecords,
    createRecord,
    updateRecord,
    deleteRecord,
    getRecordById,
    refetch,
  };
}

