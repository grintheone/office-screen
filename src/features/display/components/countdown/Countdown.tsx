import background from "@/assets/images/day-of-unity.jpg";

const DAY_WORDS = ["день", "дня", "дней"];

function getDayWord(value: number) {
	value = Math.abs(value) % 100;
	const num = value % 10;
	if (value > 10 && value < 20) return DAY_WORDS[2];
	if (num > 1 && num < 5) return DAY_WORDS[1];
	if (num === 1) return DAY_WORDS[0];
	return DAY_WORDS[2];
}

function Countdown({ daysLeft }: { daysLeft: number }) {
	return (
		<div className="flex flex-col gap-8 w-[400px] relative">
			<img
				src={background}
				className="size-full object-cover object-center rounded-xl"
				alt="some"
			/>
			<div className="absolute inset-0 text-white font-semibold flex flex-col items-center justify-baseline">
				<div className="flex flex-col items-center gap-2">
					<div className="text-[180px] h-[190px]">{daysLeft}</div>
					<div className="text-3xl mt-4">{getDayWord(daysLeft)} до</div>
				</div>
				<div className="text-3xl w-80 text-center mt-8">
					Дня народного единства
				</div>
			</div>
		</div>
	);
}

export default Countdown;
