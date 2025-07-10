import LoadingProgress from "@/assets/icons/loading.svg?react";

const Fallback = () => {
    return (
        <div className="bg-black min-h-screen flex flex-col items-center justify-center">
            <LoadingProgress className="fill-accent size-10" />
        </div>
    );
};

export default Fallback;
