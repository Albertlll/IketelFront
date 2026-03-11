import { useEffect, useState } from "react";
import { Button } from "@/shared/ui/button";
import { useToast } from "@/shared/ui/toast/hooks/hooks";
import type { StudyGeneratePayload } from "../api/study-api";

interface StudyGenerationModalProps {
	open: boolean;
	onClose: () => void;
	onStart: (payload: StudyGeneratePayload) => Promise<void>;
}

const DEFAULT_BLOCKS = 4;
const DEFAULT_QUIZZES = 8;

function StudyGenerationModal({
	open,
	onClose,
	onStart,
}: StudyGenerationModalProps) {
	const [prompt, setPrompt] = useState("");
	const [blocksCount, setBlocksCount] = useState(DEFAULT_BLOCKS);
	const [quizCount, setQuizCount] = useState(DEFAULT_QUIZZES);
	const [isLoading, setIsLoading] = useState(false);
	const { showError } = useToast();

	useEffect(() => {
		if (!open) return;
		setPrompt("");
		setBlocksCount(DEFAULT_BLOCKS);
		setQuizCount(DEFAULT_QUIZZES);
	}, [open]);

	if (!open) return null;

	const handleSubmit = async () => {
		const trimmedPrompt = prompt.trim();
		if (!trimmedPrompt) {
			showError("Введите промпт для истории");
			return;
		}

		if (blocksCount < 1 || blocksCount > 12 || quizCount < 1 || quizCount > 50) {
			showError("Проверьте диапазоны слайдеров");
			return;
		}

		setIsLoading(true);
		try {
			await onStart({
				prompt: trimmedPrompt,
				blocks_count: blocksCount,
				quiz_count: quizCount,
			});
		} catch {
			// Ошибка уже обработана на уровне вызывающего кода.
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 px-4"
			onClick={onClose}
		>
			<div
				className="w-full max-w-2xl rounded-[24px] bg-white p-6 sm:p-8 shadowDefault"
				onClick={(event) => event.stopPropagation()}
			>
				<div className="flex items-start justify-between gap-4">
					<h2 className="text-2xl font-bold text-secondary">Запуск режима «Изучить»</h2>
					<button
						type="button"
						onClick={onClose}
						className="text-gray hover:text-secondary transition-colors"
					>
						✕
					</button>
				</div>

				<div className="mt-6 space-y-6">
					<div className="space-y-2">
						<label className="text-sm text-gray" htmlFor="study_prompt">
							Промпт истории
						</label>
						<textarea
							id="study_prompt"
							value={prompt}
							onChange={(event) => setPrompt(event.target.value)}
							placeholder="Например: приключение в татарской деревне с акцентом на бытовую лексику"
							className="min-h-32 w-full resize-y rounded-[20px] border-2 border-lightPrimary px-5 py-3 outline-none transition-colors focus:border-secondary"
						/>
					</div>

					<div className="space-y-2">
						<div className="flex items-center justify-between text-sm text-gray">
							<span>Количество блоков (персонажей)</span>
							<span className="font-semibold text-secondary">{blocksCount}</span>
						</div>
						<input
							type="range"
							min={1}
							max={12}
							value={blocksCount}
							onChange={(event) => setBlocksCount(Number(event.target.value))}
							className="w-full accent-primary"
						/>
					</div>

					<div className="space-y-2">
						<div className="flex items-center justify-between text-sm text-gray">
							<span>Количество квиз-вопросов</span>
							<span className="font-semibold text-secondary">{quizCount}</span>
						</div>
						<input
							type="range"
							min={1}
							max={50}
							value={quizCount}
							onChange={(event) => setQuizCount(Number(event.target.value))}
							className="w-full accent-primary"
						/>
					</div>
				</div>

				<div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
					<Button
						type="button"
						variant="secondary"
						onClick={onClose}
						disabled={isLoading}
					>
						Отмена
					</Button>
					<Button type="button" onClick={handleSubmit} disabled={isLoading}>
						{isLoading ? "Генерация..." : "Запустить"}
					</Button>
				</div>
			</div>
		</div>
	);
}

export default StudyGenerationModal;
