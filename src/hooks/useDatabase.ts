import { useEffect, useState } from 'react';
import SyncService from '@/services/SyncService';

export function useDatabase(
    remoteUrl: string,
    localDbName: string,
) {
    const [syncService, setSyncService] = useState<SyncService | null>(null);

    useEffect(() => {
        const service = new SyncService({
            remoteDbUrl: remoteUrl,
            localDbName,
        });

        setSyncService(service);
        service.startSync()

        return () => {
            service.stopSync();
            service.destroy();
        };
    }, [remoteUrl, localDbName]);

    return syncService?.getLocalDb() || null
}
