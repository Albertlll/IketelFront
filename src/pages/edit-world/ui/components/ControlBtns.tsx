import DownloadIcon from "../img/DownloadIcon.svg";
import PlayIcon from "../img/PlayIcon.svg";
import SaveIcon from "../img/SaveIcon.svg";
import ShareIcon from "../img/ShareIcon.svg";

// import  from "../img/Do"
function ControlBtns() {
	return (
		<div className=" flex gap-4">
			<button
				type="button"
				className="flex items-center gap-2 font-bold text-secondary hover:text-primary duration-200 transition-colors"
			>
				<div>Сохранить</div>
				<img src={SaveIcon} alt="" />
			</button>

			<button
				type="button"
				className="flex items-center gap-2 text-secondary hover:text-primary duration-200 transition-colors"
			>
				<div>Играть</div>
				<img src={PlayIcon} alt="" />
			</button>

			<button
				type="button"
				className="flex items-center gap-2  text-secondary hover:text-primary duration-200 transition-colors"
			>
				<div>Поделиться</div>
				<img src={ShareIcon} alt="" />
			</button>

			<button
				type="button"
				className="flex items-center gap-2  text-secondary hover:text-primary duration-200 transition-colors"
			>
				<div>Скачать</div>
				<img src={DownloadIcon} alt="" />
			</button>
		</div>
	);
}

export default ControlBtns;
