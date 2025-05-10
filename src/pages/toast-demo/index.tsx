import { ToastExample } from "@/shared/toast";
import { translateMessage } from "@/shared/toast/utils/translationUtils";

const ToastDemoPage: React.FC = () => {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">
        {translateMessage("Toast Notifications Demo")}
      </h1>
      <p className="text-gray">
        {translateMessage("This page demonstrates the toast notification system. Click the buttons below to see different types of toast notifications.")}
      </p>
      <ToastExample />
    </div>
  );
};

export default ToastDemoPage;
