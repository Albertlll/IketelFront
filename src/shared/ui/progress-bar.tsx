interface ProgressBarProps {
	value: number; // текущий прогресс (от 0 до max)
	max: number; // максимальное значение
}

export const ProgressBar = ({ value, max }: ProgressBarProps) => (
	<div className="w-full flex items-center justify-center">
		<progress
			value={value}
			max={max}
			className="w-full h-3 sm:h-4 md:h-5 bg-secondary rounded-full
		             [&::-webkit-progress-value]:bg-primary [&::-webkit-progress-value]:rounded-full
		             [&::-moz-progress-bar]:bg-primary"
		/>
	</div>
);
