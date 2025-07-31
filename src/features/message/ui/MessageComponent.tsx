import useMessageStore from "@/features/message/model/messageStore";
import { cn } from "@/shared/lib/utils";
import { motion } from "motion/react";
import { useEffect } from "react";

const MessageComponent: React.FC = () => {
	const { message, clearMessage } = useMessageStore();

	useEffect(() => {
		if (message.text) {
			const timer = setTimeout(() => {
				clearMessage();
			}, 3000);
			return () => clearTimeout(timer);
		}
	}, [message.text, clearMessage]);

	if (!message.text) return null;

	return (
		<motion.div
			className={cn(
				"fixed bottom-4 right-4 text-white p-4 rounded shadow-lg animate-fade-in",
				message.type === "success" ? "bg-green-500" : "bg-red-500",
			)}
			initial={{ opacity: 0, y: 50 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: 50 }}
		>
			<p>{message.text}</p>
			<button
				type="button"
				onClick={clearMessage}
				className="mt-2 text-sm underline"
			>
				Close
			</button>
		</motion.div>
	);
};

export default MessageComponent;
