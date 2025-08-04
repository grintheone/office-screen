import { useS3Media } from "@/hooks/useS3Media"
import type { ClockDocument } from "@/services/AdminService"

function ClockCard(doc: ClockDocument) {
    const s3media = useS3Media(doc.image)
    return (
        <div className="flex flex-col gap-8 w-[400px]" key={doc.image}>
            <img src={s3media ? s3media : undefined} className="size-full object-cover object-center rounded-xl" alt="some" />
            <div className="text-3xl text-white whitespace-pre-wrap leading-10">
                {doc.text}
            </div>
        </div>
    )
}

export default ClockCard
