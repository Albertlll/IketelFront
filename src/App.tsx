import { Outlet } from "react-router";
import Navbar from "./widgets/navbar";

function App() {
	return (
		<div className=" flex flex-col">
			<Navbar />

			<div className=" px-40 w-full pt-20 h-full">
				<Outlet />
			</div>
		</div>
	);
}

export default App;
