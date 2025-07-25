import { useMemo } from "react";
import ClockCard from "@/features/display/components/cards/ClockCard";
import Clock from "@/features/display/components/clock";
import ClockBirthdays from "@/features/display/components/clock-birthdays/ClockBirthdays";
import Slider, {
    type Slide,
} from "@/features/display/components/slider/Slider";
import type { AnyDocument } from "@/services/AdminService";

function assembleAdminSlides(adminData: AnyDocument[]) {
    const slides: Slide[] = [
        {
            component: <Clock />,
            duration: 10000,
        },
    ];

    const birthdayNames: string[] = [];

    adminData.forEach((doc) => {
        if (doc.type === "birthday") {
            birthdayNames.push(doc.name);
        }

        if (doc.type === "clock") {
            slides.push({
                component: <ClockCard {...doc} />,
                duration: 10000,
            });
        }
    });

    if (birthdayNames.length > 0) {
        slides.push({
            component: <ClockBirthdays names={birthdayNames} />,
            duration: 30000,
        });
    }

    return slides;
}

type Props = {
    adminData: AnyDocument[];
};

function ClockFeed({ adminData }: Props) {
    const slides = useMemo(() => assembleAdminSlides(adminData), [adminData]);

    return (
        <section className="grow basis-4/12 relative">
            <Slider type="clock" slides={slides} />
        </section>
    );
}

export default ClockFeed;
