import { useEffect, useState } from 'react';
import SyncService from '@/services/SyncService';

export function useParserDb() {
    const [syncService, setSyncService] = useState<SyncService | null>(null);

    useEffect(() => {
        const service = new SyncService('main');

        setSyncService(service);
        service.startSync()

        return () => {
            service.stopSync();
            service.destroy();
        };
    }, []);

    return syncService?.getLocalDb() || null
}
