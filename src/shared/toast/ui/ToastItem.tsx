import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { Toast, ToastType, useToastStore } from "../model/toastStore";

// Icon components
const SuccessIcon = () => (
  <div className="h-6 w-6 text-current">Success</div>
);

const ErrorIcon = () => (
  <div className="h-6 w-6 text-current">Error</div>
);

const InfoIcon = () => (
  <div className="h-6 w-6 text-current">Info</div>
);

const WarningIcon = () => (
  <div className="h-6 w-6 text-current">Warning</div>
);

const CloseIcon = () => (
  <div className="h-5 w-5 text-current">Close</div>
);

interface ToastItemProps {
  toast: Toast;
}

const toastTypeStyles: Record<ToastType, string> = {
  success: "bg-secondary",
  error: "bg-primary",
  info: "bg-lightPrimary",
  warning: "bg-[#F9CB80]",
};

const toastIcons: Record<ToastType, React.ReactNode> = {
  success: <SuccessIcon />,
  error: <ErrorIcon />,
  info: <InfoIcon />,
  warning: <WarningIcon />,
};

export const ToastItem: React.FC<ToastItemProps> = ({ toast }) => {
  const { removeToast } = useToastStore();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 50, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 50, scale: 0.9 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "flex items-start gap-3 p-4 rounded-[20px] shadowDefault text-white mb-2 max-w-md w-full",
        toastTypeStyles[toast.type]
      )}
    >
      <div className="flex-1">
        <p className="text-[14px] font-medium">{toast.message}</p>
      </div>
      <button
        onClick={() => removeToast(toast.id)}
        className="flex-shrink-0 text-white hover:text-gray-200 transition-colors"
        aria-label="Close"
      >
        <CloseIcon />
      </button>
    </motion.div>
  );
};
