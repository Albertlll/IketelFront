import { AnimatePresence } from "motion/react";
import { useToastStore } from "../model/toastStore";
import { ToastItem } from "./ToastItem";

export const ToastContainer: React.FC = () => {
  const { toasts } = useToastStore();

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end max-w-full sm:max-w-md">
      <AnimatePresence>
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} />
        ))}
      </AnimatePresence>
    </div>
  );
};
