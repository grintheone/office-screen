import { useAppDispatch } from '@/app/hooks'
import { setEffect } from '@/features/display/displaySlice'
import { useEffect } from 'react'
import image from "@/assets/images/birthday.jpg"
import hat from "@/assets/videos/hat.webm"

function BirthdayCard() {
    const dispatch = useAppDispatch()

    useEffect(() => {
        const id = setTimeout(() => {
            dispatch(setEffect('confetti'))
        }, 2500)

        return () => clearTimeout(id)
    }, [dispatch])


    return (
        <div className='flex flex-col gap-8 max-w-3xl animate-rotate-y'>
            <div className='relative size-[450px]'>
                <img className='z-10 size-full object-cover rounded-2xl' src={image} alt="birthday image" />
                <video
                    className='scale-150 absolute size-full left-[38.5px] top-[-38.5px] z-20'
                    src={hat}
                    autoPlay
                    muted
                />
            </div>
            <div className='text-3xl text-white animate-slide-up opacity-0'>С днем рождения, Валерия Сергеевна!</div>
        </div>
    )
}

export default BirthdayCard
