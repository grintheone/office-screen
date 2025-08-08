import { baseCloudUrl } from "@/features/admin/loader";

export const useS3Media = (fname: string) => {
    if (fname.length > 0) {
        return `${baseCloudUrl}/${fname}`;
    }

    return "";
};
