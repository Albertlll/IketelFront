import { useState } from "react";
import { cn } from "../lib/utils";

function SwitchButton(props : {isChecked : boolean}) {

  const [isChecked, setIsChecked] = useState<boolean>(props.isChecked);

  return (
    // Надо будет доделать доступность
    <button onClick={() => { setIsChecked(prev => !prev)}} className={ cn(" h-6 w-12 bg-secondary relative rounded-full border-4 border-secondary box-content duration-200 transition-colors", isChecked ? "  bg-primary border-primary" : "")}>
      <div className={cn(" h-6 w-6 top-0 left-0 absolute bg-gray-200 rounded-full duration-200 transition-all right-auto", isChecked ? "left-6" : "")}/>
    </button>
  );
}

export default SwitchButton;
