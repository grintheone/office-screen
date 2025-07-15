import { useState } from "react";
import Cropper from "react-easy-crop";
import { Button } from "@/components/ui/button";

type Point = {
    x: number;
    y: number;
};

type Area = {
    width: number;
    height: number;
    x: number;
    y: number;
};

const ImageCropper = () => {
    const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);

    const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
        console.log(croppedArea, croppedAreaPixels);
    };

    const changeZoomHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setZoom(Number(e.target.value));
    };

    return (
        <div className="absolute h-[150%] w-full top-[-25%] left-0 bg-white rounded-md flex flex-col p-4 z-20">
            <div className="relative grow shrink-0 basis-auto">
                <Cropper
                    image="https://img.huffingtonpost.com/asset/5ab4d4ac2000007d06eb2c56.jpeg?cache=sih0jwle4e&ops=1910_1000"
                    crop={crop}
                    zoom={zoom}
                    aspect={4 / 4}
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
                <Button className="text-lg">Готово</Button>
            </div>
        </div>
    );
};

export default ImageCropper;
