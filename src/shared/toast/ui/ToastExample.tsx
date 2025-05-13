import { useToast } from "../hooks/hooks";
import { Button } from "@/shared/button";

/**
 * Пример компонента, демонстрирующего использование тостов
 */
const ToastExample: React.FC = () => {
  const { showSuccess, showError, showInfo, showWarning } = useToast();

  const handleSuccessClick = () => {
    showSuccess("Операция успешно выполнена!");
  };

  const handleErrorClick = () => {
    showError("Произошла ошибка!");
  };

  const handleInfoClick = () => {
    showInfo("Важная информация");
  };

  const handleWarningClick = () => {
    showWarning("Внимание! Что-то пошло не так.");
  };

  return (
    <div className="flex flex-col gap-4">
      <Button onClick={handleSuccessClick} variant="default">
        Показать успешный тост
      </Button>

      <Button onClick={handleErrorClick} variant="destructive">
        Показать тост с ошибкой
      </Button>

      <Button onClick={handleInfoClick} variant="outline">
        Показать информационный тост
      </Button>

      <Button onClick={handleWarningClick} variant="secondary">
        Показать предупреждающий тост
      </Button>
    </div>
  );
};

export default ToastExample;