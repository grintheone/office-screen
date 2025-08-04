import { useCallback, useEffect, useState } from "react";

export const useS3Media = (fname: string) => {
    const [s3media, setS3Media] = useState("")

    const fetchPresignedUrl = useCallback(async () => {
        try {
            const response = await fetch(`/api/getPresignedMedia?name=${fname}`);
            setS3Media(response.url)
        } catch (err) {
            console.log(err, "error loading media");
            setS3Media("")
        }
    }, [fname])

    useEffect(() => {
        if (fname.length > 0) {
            fetchPresignedUrl()
        }
    }, [fetchPresignedUrl, fname])

    return s3media
}
