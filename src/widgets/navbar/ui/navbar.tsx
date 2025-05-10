import { Avatar } from "@/entities/user";
import { cn } from "@/lib/utils";
import { Link } from "react-router";
import { useNavbarStore } from "../model/navbarState";
import IketelLogo from "./img/main-logo.svg";

function Navbar() {
	const { selectedIndex, setSelectedIndex } = useNavbarStore();

	return (
		<div className="relative top-0 w-full h-fit font-medium">
			<div className="w-full flex items-center justify-between p-[10px] bg-white shadowDefault">
				<button onClick={() => setSelectedIndex(0)} type="button">
					<img src={IketelLogo} alt="Iketel Logo" className="scale-70" />
				</button>

				<div className="flex gap-10 text-secondary">
					<Link
						className={cn(
							"transition-colors duration-200 hover:text-primary",
							selectedIndex === 0 ? "text-primary" : "",
						)}
						viewTransition
						to={"my-worlds"}
					>
						Мои мирки
					</Link>

					<Link
						viewTransition
						to={"/"}
						className={cn(
							"transition-colors duration-200 hover:text-primary",
							selectedIndex === 1 ? "text-primary" : "",
						)}
					>
						Библиотека
					</Link>

				</div>

				<div className="flex items-center gap-4">
					<Avatar selected={selectedIndex === 2} />
				</div>
			</div>
		</div>
	);
}

export default Navbar;
