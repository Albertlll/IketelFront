import type { StudyGameBlock, StudyGameTask } from "@/entities/adventure/types/adventureTypes";
import { ProgressBar } from "@/shared/ui/progress-bar";
import { Button } from "@/shared/ui/button";
import { useLocation, useNavigate, useParams } from "react-router";
import { useMemo, useState } from "react";

interface StudyLocationState {
	game?: StudyGameBlock[];
	worldImage?: string;
}

function StudyGame() {
	const location = useLocation();
	const navigate = useNavigate();
	const { worldId } = useParams();

	const parsedState = useMemo(
		() => (location.state ?? null) as StudyLocationState | null,
		[location.state],
	);
	const gameBlocks = useMemo(
		() => (Array.isArray(parsedState?.game) ? parsedState.game : []),
		[parsedState],
	);
	const fallbackWorldImage = parsedState?.worldImage ?? "";

	const totalTasks = useMemo(
		() => gameBlocks.reduce((sum, block) => sum + block.tasks.length, 0),
		[gameBlocks],
	);

	const [blockIndex, setBlockIndex] = useState(0);
	const [taskIndex, setTaskIndex] = useState(0);
	const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
	const [isChecked, setIsChecked] = useState(false);
	const [isCorrect, setIsCorrect] = useState(false);
	const [score, setScore] = useState(0);
	const [isIntroVisible, setIsIntroVisible] = useState(true);
	const [isFinished, setIsFinished] = useState(false);

	if (!gameBlocks.length) {
		return (
			<div className="w-full h-full flex items-center justify-center">
				<div className="w-full max-w-xl rounded-[24px] bg-white p-8 shadowDefault text-center space-y-4">
					<h1 className="text-2xl font-bold text-secondary">Нет данных для запуска</h1>
					<p className="text-gray">
						Откройте мирок #{worldId} и заново запустите режим «Изучить».
					</p>
					<Button type="button" onClick={() => navigate(-1)}>
						Назад
					</Button>
				</div>
			</div>
		);
	}

	const currentBlock = gameBlocks[blockIndex];
	const currentTask = currentBlock.tasks[taskIndex] as StudyGameTask;
	const currentImage = currentBlock.image_url || fallbackWorldImage;

	const answeredTasks =
		gameBlocks
			.slice(0, blockIndex)
			.reduce((sum, block) => sum + block.tasks.length, 0) +
		taskIndex +
		(isChecked ? 1 : 0);

	const handleCheck = () => {
		if (selectedAnswer === null) return;
		const answerCorrect = selectedAnswer === currentTask.answer;
		setIsChecked(true);
		setIsCorrect(answerCorrect);
		if (answerCorrect) {
			setScore((prev) => prev + 1);
		}
	};

	const handleNext = () => {
		const isTaskLastInBlock = taskIndex >= currentBlock.tasks.length - 1;
		const isLastBlock = blockIndex >= gameBlocks.length - 1;

		if (isTaskLastInBlock && isLastBlock) {
			setIsFinished(true);
			return;
		}

		if (isTaskLastInBlock) {
			setBlockIndex((prev) => prev + 1);
			setTaskIndex(0);
			setIsIntroVisible(true);
		} else {
			setTaskIndex((prev) => prev + 1);
		}

		setSelectedAnswer(null);
		setIsChecked(false);
		setIsCorrect(false);
	};

	if (isFinished) {
		return (
			<div className="w-full h-full flex items-center justify-center">
				<div className="w-full max-w-xl rounded-[24px] bg-white p-8 shadowDefault text-center space-y-6">
					<h1 className="text-3xl font-bold text-secondary">Игра завершена</h1>
					<p className="text-xl text-gray">
						Результат: <span className="font-bold text-primary">{score}</span> / {totalTasks}
					</p>
					<div className="flex flex-col sm:flex-row justify-center gap-3">
						<Button type="button" onClick={() => navigate(-1)}>
							К мирку
						</Button>
						<Button type="button" variant="secondary" onClick={() => navigate(0)}>
							Повторить
						</Button>
					</div>
				</div>
			</div>
		);
	}

	if (isIntroVisible) {
		return (
			<div className="w-full h-full flex items-center justify-center">
				<div className="w-full max-w-5xl rounded-[24px] bg-white p-6 sm:p-8 shadowDefault grid gap-6 md:grid-cols-[240px_1fr]">
					<div className="rounded-[20px] overflow-hidden border border-lightPrimary bg-background min-h-[220px]">
						{currentImage ? (
							<img src={currentImage} alt="Character" className="w-full h-full object-cover" />
						) : (
							<div className="w-full h-full flex items-center justify-center text-gray">Без изображения</div>
						)}
					</div>

					<div className="flex flex-col gap-5">
						<div>
							<p className="text-sm text-gray">Блок {blockIndex + 1} из {gameBlocks.length}</p>
							<h1 className="text-2xl font-bold text-secondary mt-1">Вступление</h1>
						</div>
						<p className="text-base sm:text-lg leading-relaxed whitespace-pre-line">{currentBlock.replika}</p>
						<div>
							<Button type="button" onClick={() => setIsIntroVisible(false)}>
								Продолжить
							</Button>
						</div>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="mx-auto w-full max-w-5xl rounded-[24px] bg-white p-6 sm:p-8 shadowDefault space-y-6">
			<div className="space-y-2">
				<div className="flex justify-between text-sm text-gray">
					<span>Прогресс</span>
					<span>{Math.min(answeredTasks, totalTasks)} / {totalTasks}</span>
				</div>
				<ProgressBar value={Math.min(answeredTasks, totalTasks)} max={Math.max(totalTasks, 1)} />
			</div>

			<div className="grid gap-6 md:grid-cols-[240px_1fr]">
				<div className="rounded-[20px] overflow-hidden border border-lightPrimary bg-background min-h-[220px]">
					{currentImage ? (
						<img src={currentImage} alt="Character" className="w-full h-full object-cover" />
					) : (
						<div className="w-full h-full flex items-center justify-center text-gray">Без изображения</div>
					)}
				</div>

				<div className="space-y-4">
					<h2 className="text-2xl font-bold text-secondary">{currentTask.title}</h2>
					<div className="grid gap-3">
						{currentTask.variants.map((variant, index) => {
							const isSelected = selectedAnswer === index;
							const isCorrectOption = isChecked && index === currentTask.answer;
							const isWrongSelected = isChecked && isSelected && index !== currentTask.answer;

							return (
								<button
									type="button"
									key={`${variant}-${index}`}
									onClick={() => !isChecked && setSelectedAnswer(index)}
									className={[
										"w-full rounded-[16px] border-2 px-4 py-3 text-left transition-colors",
										isSelected ? "border-secondary" : "border-lightPrimary",
										isCorrectOption ? "bg-green-100 border-green-500" : "",
										isWrongSelected ? "bg-red-100 border-red-500" : "",
									].join(" ")}
								>
									{variant}
								</button>
							);
						})}
					</div>

					{isChecked && (
						<p className={isCorrect ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>
							{isCorrect ? "Верно!" : "Неверно. Попробуйте следующий вопрос."}
						</p>
					)}

					<div className="flex justify-end">
						{isChecked ? (
							<Button type="button" onClick={handleNext}>
								Далее
							</Button>
						) : (
							<Button type="button" onClick={handleCheck} disabled={selectedAnswer === null}>
								Проверить
							</Button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default StudyGame;
