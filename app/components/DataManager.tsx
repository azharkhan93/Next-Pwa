'use client';

import { useState, useEffect } from 'react';

// Dynamic imports to avoid SSR issues
interface UserData {
  id?: number;
  text: string;
  timestamp: number;
  synced: boolean;
}

interface SyncService {
  getAllData(): Promise<UserData[]>;
  addData(text: string): Promise<number>;
  deleteData(id: number): Promise<void>;
  manualSync(): Promise<void>;
  clearAllData(): Promise<void>;
  updateOnlineStatus(): void;
  onSyncStatusChange(callback: (synced: boolean) => void): void;
}

let syncService: SyncService | null = null;

export default function DataManager() {
  const [data, setData] = useState<UserData[]>([]);
  const [inputText, setInputText] = useState('');
  const [isOnline, setIsOnline] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'synced' | 'error'>('idle');

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;

    // Dynamically import services
    const initializeServices = async () => {
      const syncModule = await import('../../lib/syncService');
      
      syncService = syncModule.syncService;
      
      // Initialize IndexedDB and load data
      await loadData();
    
      // Set up online/offline status listeners
      setIsOnline(navigator.onLine);
      syncService.updateOnlineStatus();
      
      const handleOnline = () => {
        setIsOnline(true);
        syncService?.updateOnlineStatus();
      };
      const handleOffline = () => {
        setIsOnline(false);
        syncService?.updateOnlineStatus();
      };
      
      window.addEventListener('online', handleOnline);
      window.addEventListener('offline', handleOffline);

      // Set up sync status listener
      syncService.onSyncStatusChange((synced: boolean) => {
        setSyncStatus(synced ? 'synced' : 'error');
        setTimeout(() => setSyncStatus('idle'), 3000);
      });

      return () => {
        window.removeEventListener('online', handleOnline);
        window.removeEventListener('offline', handleOffline);
      };
    };

    initializeServices();
  }, []);

  const loadData = async () => {
    if (!syncService) return;
    
    try {
      const allData = await syncService.getAllData();
      setData(allData);
    } catch (error) {
      console.error('Failed to load data:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !syncService) return;

    setIsLoading(true);
    try {
      await syncService.addData(inputText.trim());
      setInputText('');
      await loadData(); // Reload data to show new item
    } catch (error) {
      console.error('Failed to add data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!syncService) return;
    
    try {
      await syncService.deleteData(id);
      await loadData();
    } catch (error) {
      console.error('Failed to delete data:', error);
    }
  };

  const handleManualSync = async () => {
    if (!syncService) return;
    
    setIsSyncing(true);
    try {
      await syncService.manualSync();
      await loadData();
      setSyncStatus('synced');
      setTimeout(() => setSyncStatus('idle'), 3000);
    } catch (error) {
      console.error('Manual sync failed:', error);
      setSyncStatus('error');
      setTimeout(() => setSyncStatus('idle'), 3000);
    } finally {
      setIsSyncing(false);
    }
  };

  const handleClearData = async () => {
    if (!syncService) return;
    
    if (confirm('Are you sure you want to clear all data? This cannot be undone.')) {
      try {
        await syncService.clearAllData();
        await loadData();
      } catch (error) {
        console.error('Failed to clear data:', error);
      }
    }
  };

  const getSyncIndicator = () => {
    if (!isOnline) return { text: 'Offline', color: 'text-red-500', bg: 'bg-red-100' };
    if (syncStatus === 'syncing' || isSyncing) return { text: 'Syncing...', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    if (syncStatus === 'synced') return { text: 'Synced', color: 'text-green-600', bg: 'bg-green-100' };
    if (syncStatus === 'error') return { text: 'Sync Error', color: 'text-red-600', bg: 'bg-red-100' };
    return { text: 'Online', color: 'text-green-600', bg: 'bg-green-100' };
  };

  const syncIndicator = getSyncIndicator();
  const unsyncedCount = data.filter(item => !item.synced).length;

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Data Manager
        </h2>
        <div className="flex items-center gap-3">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${syncIndicator.bg} ${syncIndicator.color}`}>
            {syncIndicator.text}
          </span>
          {unsyncedCount > 0 && (
            <span className="px-2 py-1 bg-orange-100 text-orange-600 rounded-full text-xs font-medium">
              {unsyncedCount} pending
            </span>
          )}
        </div>
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Enter your data here..."
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !inputText.trim()}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? 'Adding...' : 'Add'}
          </button>
        </div>
        {!isOnline && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            📱 You&apos;re offline. Data will be synced when connection is restored.
          </p>
        )}
      </form>

      {/* Sync Button */}
      {isOnline && unsyncedCount > 0 && (
        <div className="mb-4">
          <button
            onClick={handleManualSync}
            disabled={isSyncing}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isSyncing ? 'Syncing...' : `Sync ${unsyncedCount} items`}
          </button>
        </div>
      )}

      {/* Data List */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Your Data ({data.length})
        </h3>
        {data.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center py-8">
            No data yet. Add some data above!
          </p>
        ) : (
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {data
              .sort((a, b) => b.timestamp - a.timestamp)
              .map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div className="flex-1">
                    <p className="text-gray-900 dark:text-white">{item.text}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(item.timestamp).toLocaleString()}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs ${
                          item.synced
                            ? 'bg-green-100 text-green-600'
                            : 'bg-orange-100 text-orange-600'
                        }`}
                      >
                        {item.synced ? 'Synced' : 'Pending'}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => item.id && handleDelete(item.id)}
                    className="ml-3 p-1 text-red-500 hover:text-red-700 hover:bg-red-100 rounded transition-colors"
                    title="Delete"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
