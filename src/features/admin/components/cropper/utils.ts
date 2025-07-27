import type { Area } from "@/features/admin/components/cropper/ImageCropper";

// Helper function to read the file
export function readFile(file: File): Promise<string> {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.addEventListener("load", () => resolve(reader.result?.toString() || ""), false);
        reader.readAsDataURL(file);
    });
}

// Helper function to convert a data URL to a File object
export async function urlToFile(url: string, filename: string, mimeType: string): Promise<File> {
    const res = await fetch(url);
    const buf = await res.arrayBuffer();
    return new File([buf], filename, { type: mimeType });
}

export function createImage(url: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.addEventListener("load", () => resolve(image));
        image.addEventListener("error", (error) => reject(error));
        image.src = url;
    });
}

export async function getCroppedImg(
    imageSrc: string,
    pixelCrop: Area
): Promise<string> {
    const image = await createImage(imageSrc);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) {
        throw new Error("Could not get canvas context");
    }

    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height
    );

    return new Promise<string>((resolve) => {
        canvas.toBlob((blob) => {
            if (!blob) return;
            resolve(URL.createObjectURL(blob));
        }, "image/jpeg");
    });
}
