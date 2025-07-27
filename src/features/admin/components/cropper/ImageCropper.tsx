import { useCallback, useEffect, useState } from "react";
import Cropper from "react-easy-crop";
import { Button } from "@/components/ui/button";
import {
    getCroppedImg,
    readFile,
    urlToFile,
} from "@/features/admin/components/cropper/utils";

export type Area = {
    width: number;
    height: number;
    x: number;
    y: number;
};

type Props = {
    file: File;
    onComplete: (file: File) => void;
    onCancel: () => void;
};

const ImageCropper = ({ file, onComplete, onCancel }: Props) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
    const [imageSrc, setImageSrc] = useState<string | null>(null);

    useEffect(() => {
        const loadImage = async () => {
            const imageDataUrl = await readFile(file);
            setImageSrc(imageDataUrl);
        };
        loadImage();
    }, [file]);

    const onCropComplete = useCallback((_: Area, croppedAreaPixels: Area) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const handleCrop = useCallback(async () => {
        if (!imageSrc || !croppedAreaPixels) return;

        try {
            const croppedImageUrl = await getCroppedImg(imageSrc, croppedAreaPixels);

            const croppedFile = await urlToFile(
                croppedImageUrl,
                file.name,
                file.type,
            );

            onComplete(croppedFile);
        } catch (e) {
            console.error("Error cropping image", e);
        }
    }, [imageSrc, croppedAreaPixels, file, onComplete]);

    const changeZoomHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setZoom(Number(e.target.value));
    };

    return (
        <div className="absolute size-full inset-0 bg-white rounded-md flex flex-col p-4 z-20">
            <div className="relative grow shrink-0 basis-auto">
                <Cropper
                    image={imageSrc || undefined}
                    crop={crop}
                    zoom={zoom}
                    aspect={1}
                    onCropChange={setCrop}
                    onCropComplete={onCropComplete}
                    onZoomChange={setZoom}
                />
            </div>
            <div className="flex items-center justify-between pt-4 text-lg">
                <div className="flex items-center gap-4">
                    <label htmlFor="zoom">Увеличение</label>
                    <input
                        className="accent-primary w-48"
                        type="range"
                        id="zoom"
                        name="zoom"
                        value={zoom}
                        min="1"
                        step=".01"
                        max="3"
                        onChange={changeZoomHandler}
                    />
                </div>
                <div className="flex gap-4">
                    <Button onClick={onCancel} className="text-lg">
                        Отмена
                    </Button>
                    <Button onClick={handleCrop} className="text-lg">
                        Готово
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ImageCropper;
