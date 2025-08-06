import { cn } from "@/shared/lib/utils";
import SwitchButton from "@/shared/ui/switch";
import { DownloadIcon, PlayIcon, SaveIcon, ShareIcon } from "../img/Icons";
import { useEditorStore } from "../../model/world-editor-store";
// import SaveIcon from "../img/SaveIcon.svg";
// import  from "../img/Do"
function ControlBtns({
  saveHandler,
  playHandler,
  publishHandler,
  downloadHandler,
  mode,
}: {
  saveHandler: () => void;
  playHandler: () => void;
  publishHandler: () => void;
  downloadHandler: () => void;
  mode: "read" | "create" | "edit";
}) {


  const { isPublic } = useEditorStore()


  return (
    <div className="flex flex-wrap gap-2 sm:gap-4">
      <button
        onClick={saveHandler}
        type="button"
        className={cn(
          "group flex items-center gap-1 sm:gap-2 font-bold text-secondary hover:text-primary duration-200 transition-colors",
          mode === "read" && "text-gray hover:text-gray",
        )}
        disabled={mode === "read"}
        title="Сохранить"
      >
        <div className="hidden sm:block">Сохранить</div>
        <SaveIcon />
      </button>

      <button
        onClick={playHandler}
        type="button"
        className="flex items-center gap-1 sm:gap-2 text-secondary hover:text-primary duration-200 transition-colors"
        title="Играть"
      >
        <div className="hidden sm:block">Играть</div>
        <PlayIcon />
      </button>


      <button
        onClick={downloadHandler}
        type="button"
        className="flex items-center gap-1 sm:gap-2 text-secondary hover:text-primary duration-200 transition-colors"
        title="Скачать"
      >
        <div className="hidden sm:block">Скачать</div>
        <DownloadIcon />
      </button>


      {mode !== "read"

      &&
      <div 
 className="flex gap-1 items-center">
        <div className="hidden sm:block text-secondary">Публичный</div>
        <SwitchButton isChecked={isPublic}/>
      </div>

      

      }

    </div>
  );
}

export default ControlBtns;
