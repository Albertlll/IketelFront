import preloaderGif from "./preloader.gif";

const Preloader = () => {
	return (
		<div className=" w-full h-full flex items-center justify-center">
			<div className=" p-6 w-[300px] h-[300px]  flex justify-center items-center bg-white rounded-[20px]">
				<img src={preloaderGif} alt="Loading..." className=" w-full h-full" />
			</div>
		</div>
	);
};

export default Preloader;
