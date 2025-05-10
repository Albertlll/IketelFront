import { Outlet } from "react-router";
import { ToastContainer } from "./shared/toast";
import Navbar from "./widgets/navbar";

function App() {
	return (
		<div className="flex flex-col min-h-screen">
			<Navbar />

			<div className="px-4 sm:px-6 md:px-10 lg:px-20 xl:px-40 w-full pt-6 md:pt-10 lg:pt-20 flex-grow">
				<Outlet />
			</div>
			
			{/* Toast notifications container */}
			<ToastContainer />
		</div>
	);
}

export default App;
