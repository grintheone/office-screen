import type { Document } from "@/services/AdminService";

export function getDocumentOrder(
    doc: Pick<Document, "_id" | "order">,
): number {
    if (typeof doc.order === "number" && Number.isFinite(doc.order)) {
        return doc.order;
    }

    const legacyTimestamp = Date.parse(doc._id);
    if (Number.isFinite(legacyTimestamp)) {
        return -legacyTimestamp;
    }

    return Number.MAX_SAFE_INTEGER;
}

export function sortDocumentsByOrder<T extends Pick<Document, "_id" | "order">>(
    docs: T[],
): T[] {
    return [...docs].sort((left, right) => {
        const orderDiff = getDocumentOrder(left) - getDocumentOrder(right);
        if (orderDiff !== 0) {
            return orderDiff;
        }

        return left._id.localeCompare(right._id);
    });
}

export function normalizeDocumentOrders<T extends Document>(docs: T[]): T[] {
    return docs.map((doc, index) => ({
        ...doc,
        order: index,
    }));
}
