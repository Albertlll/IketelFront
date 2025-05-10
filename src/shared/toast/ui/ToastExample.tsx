import { Button } from "@/shared/button";
import { useToast } from "../hooks/useToast";
import { showSuccess, showError, showInfo, showWarning } from "../utils/toastUtils";
import { getLanguage, setLanguage, translateMessage } from "../utils/translationUtils";
import { useEffect, useState } from "react";

export const ToastExample: React.FC = () => {
  const { success, error, info, warning } = useToast();
  const [language, setCurrentLanguage] = useState(getLanguage());

  // Function to toggle language
  const toggleLanguage = () => {
    const newLanguage = language === "en" ? "ru" : "en";
    setLanguage(newLanguage);
    setCurrentLanguage(newLanguage);
  };

  return (
    <div className="flex flex-col gap-6 p-4">
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">{translateMessage("Language Settings")}</h2>
        <div className="flex items-center gap-2">
          <span>{translateMessage("Current Language")}: {language === "en" ? "English" : "Русский"}</span>
          <Button 
            onClick={toggleLanguage} 
            variant="outline"
          >
            {translateMessage("Switch to")} {language === "en" ? "Русский" : "English"}
          </Button>
        </div>
      </div>
      <div>
        <h2 className="text-xl font-bold mb-2">{translateMessage("Using React Hook")}</h2>
        <p className="text-gray mb-4">{translateMessage("These examples use the useToast hook (for React components)")}</p>
        <div className="flex flex-wrap gap-2">
          <Button
            onClick={() => success("Operation completed successfully!")}
            variant="default"
          >
            {translateMessage("Show Success")}
          </Button>
          <Button
            onClick={() => error("An error occurred. Please try again.")}
            variant="destructive"
          >
            {translateMessage("Show Error")}
          </Button>
          <Button
            onClick={() => info("Here's some information for you.")}
            variant="secondary"
          >
            {translateMessage("Show Info")}
          </Button>
          <Button
            onClick={() => warning("Be careful with this action.")}
            variant="outline"
          >
            {translateMessage("Show Warning")}
          </Button>
          <Button
            onClick={() => {
              // Show multiple toasts to demonstrate stacking
              success("First notification");
              setTimeout(() => info("Second notification"), 300);
              setTimeout(() => warning("Third notification"), 600);
              setTimeout(() => error("Fourth notification"), 900);
            }}
            variant="default"
          >
            {translateMessage("Show Multiple")}
          </Button>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-2">{translateMessage("Using Utility Functions")}</h2>
        <p className="text-gray mb-4">{translateMessage("These examples use the utility functions (for non-React contexts like API calls)")}</p>
        <div className="flex flex-wrap gap-2">
          <Button
            onClick={() => showSuccess("Success from utility function!")}
            variant="default"
          >
            {translateMessage("Show Success")}
          </Button>
          <Button
            onClick={() => showError("Error from utility function!")}
            variant="destructive"
          >
            {translateMessage("Show Error")}
          </Button>
          <Button
            onClick={() => showInfo("Info from utility function!")}
            variant="secondary"
          >
            {translateMessage("Show Info")}
          </Button>
          <Button
            onClick={() => showWarning("Warning from utility function!")}
            variant="outline"
          >
            {translateMessage("Show Warning")}
          </Button>
        </div>
      </div>
    </div>
  );
};
