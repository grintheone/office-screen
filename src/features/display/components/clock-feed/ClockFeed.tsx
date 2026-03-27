import { useMemo } from "react";
import ClockCard from "@/features/display/components/cards/ClockCard";
import Clock from "@/features/display/components/clock";
import ClockBirthdays from "@/features/display/components/clock-birthdays/ClockBirthdays";
import Countdown from "@/features/display/components/countdown/Countdown";
import Slider, {
	type Slide,
} from "@/features/display/components/slider/Slider";
import type { AnyDocument } from "@/services/AdminService";

function assembleAdminSlides(
	adminData: AnyDocument[],
	kBirthdays: string[] | undefined,
) {
	const slides: Slide[] = [
		{
			component: <Clock />,
			duration: 10000,
		},
	];

	// Counting something down
	const now = Date.now();
	const countdownDate = new Date("Jan 1, 2026").getTime();
	if (now < countdownDate) {
		const distance = countdownDate - now;
		if (distance > 0) {
			const days = Math.floor(distance / (1000 * 60 * 60 * 24));

			slides.push({
				component: <Countdown daysLeft={days} />,
				duration: 20000,
			});
		}
	}

	let birthdayNames: string[] = [];

	if (kBirthdays) {
		birthdayNames = [...kBirthdays];
	}

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
	kBirthdays: string[] | undefined;
};

function ClockFeed({ adminData, kBirthdays }: Props) {
	const slides = useMemo(
		() => assembleAdminSlides(adminData, kBirthdays),
		[adminData, kBirthdays],
	);

	return (
		<section className="grow basis-4/12 relative">
			<Slider type="clock" slides={slides} />
		</section>
	);
}

export default ClockFeed;
