import { Outlet } from "react-router";
import Navbar from "../../widgets/navbar";
import { ToastContainer } from "../../shared/ui/toast";

function App() {







	return (
		<div className=" flex flex-col">
			<Navbar />

			<div className=" px-4 pb-8 sm:px-8 md:px-16 lg:px-40 w-full pt-10 md:pt-20 h-full">
				<Outlet />
			</div>

			{/* Контейнер для тостов */}
			<ToastContainer />
		</div>
	);
}

export default App;
