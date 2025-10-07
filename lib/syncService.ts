// Sync service for handling offline-to-online data synchronization

import { dbService, UserData } from './indexedDB';

class SyncService {
  private isOnline = typeof window !== 'undefined' ? navigator.onLine : true;
  private syncListeners: Array<(synced: boolean) => void> = [];

  constructor() {
    if (typeof window !== 'undefined') {
      this.setupEventListeners();
    }
  }

  private setupEventListeners() {
    window.addEventListener('online', () => {
      this.isOnline = true;
      this.syncOfflineData();
    });

    window.addEventListener('offline', () => {
      this.isOnline = false;
    });
  }

  getOnlineStatus(): boolean {
    return this.isOnline;
  }

  onSyncStatusChange(callback: (synced: boolean) => void) {
    this.syncListeners.push(callback);
  }

  private notifySyncListeners(synced: boolean) {
    this.syncListeners.forEach(callback => callback(synced));
  }

  async syncOfflineData(): Promise<void> {
    if (!this.isOnline) return;

    try {
      const unsyncedData = await dbService.getUnsyncedData();
      
      for (const item of unsyncedData) {
        try {
          // Simulate API call - replace with your actual API endpoint
          const success = await this.simulateAPICall(item);
          
          if (success && item.id) {
            await dbService.markAsSynced(item.id);
          }
        } catch (error) {
          console.error('Failed to sync item:', item, error);
        }
      }

      this.notifySyncListeners(true);
    } catch (error) {
      console.error('Failed to sync offline data:', error);
      this.notifySyncListeners(false);
    }
  }

  private async simulateAPICall(data: UserData): Promise<boolean> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
    
    // Simulate occasional network failures (10% chance)
    if (Math.random() < 0.1) {
      throw new Error('Network error');
    }

    // Simulate successful API response
    console.log('Synced to server:', data);
    return true;
  }

  async addData(text: string): Promise<number> {
    const data = {
      text,
      timestamp: Date.now(),
      synced: false // Always start as unsynced, then sync if online
    };

    const id = await dbService.addData(data);

    // If online, try to sync immediately
    if (this.isOnline) {
      try {
        const success = await this.simulateAPICall({ ...data, id });
        if (success) {
          await dbService.markAsSynced(id);
          // Notify listeners that sync completed
          this.notifySyncListeners(true);
        }
      } catch (error) {
        console.error('Failed to sync immediately:', error);
        this.notifySyncListeners(false);
      }
    }

    return id;
  }

  async getAllData(): Promise<UserData[]> {
    return await dbService.getAllData();
  }

  async deleteData(id: number): Promise<void> {
    await dbService.deleteData(id);
  }

  // Manual sync trigger
  async manualSync(): Promise<void> {
    await this.syncOfflineData();
  }

  // Clear all data (for debugging)
  async clearAllData(): Promise<void> {
    await dbService.clearAllData();
  }

  // Force update online status
  updateOnlineStatus(): void {
    this.isOnline = typeof window !== 'undefined' ? navigator.onLine : true;
  }
}

export const syncService = new SyncService();
