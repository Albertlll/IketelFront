import { Avatar } from "@/entities/user";
import { cn } from "@/lib/utils";
import { Link } from "react-router";
import { useNavbarStore } from "../model/navbarState";
import IketelLogo from "./img/main-logo.svg";
import { useState } from "react";

function Navbar() {
	const { selectedIndex, setSelectedIndex } = useNavbarStore();
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	return (
		<div className="relative top-0 w-full flex flex-col h-fit overflow-hidden font-medium">
			<div className="w-full flex items-center justify-between p-[10px] bg-white shadowDefault">
				<button onClick={() => setSelectedIndex(0)} type="button">
					<img src={IketelLogo} alt="Iketel Logo" className="scale-70" />
				</button>

				{/* Desktop Navigation */}
				<div className="hidden md:flex gap-10 text-secondary">
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

					<Link
						viewTransition
						to={"/toast-demo"}
						className={cn(
							"transition-colors duration-200 hover:text-primary",
							selectedIndex === 3 ? "text-primary" : "",
						)}
					>
						Уведомления
					</Link>
				</div>

				<div className="flex items-center gap-4">
					<Avatar selected={selectedIndex === 2} />
					
					{/* Mobile Menu Button */}
					<button 
						className="md:hidden flex flex-col gap-1.5 p-1"
						onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
					>
						<span className={cn(
							"block w-6 h-0.5 bg-secondary transition-transform duration-300",
							mobileMenuOpen ? "rotate-45 translate-y-2" : ""
						)}></span>
						<span className={cn(
							"block w-6 h-0.5 bg-secondary transition-opacity duration-300",
							mobileMenuOpen ? "opacity-0" : "opacity-100"
						)}></span>
						<span className={cn(
							"block w-6 h-0.5 bg-secondary transition-transform duration-300",
							mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
						)}></span>
					</button>
				</div>
			</div>

			{/* Mobile Navigation */}
			<div className={cn(
				"md:hidden bg-white w-full overflow-hidden transition-all duration-300 shadowDefault",
				mobileMenuOpen ? "max-h-[300px] py-4" : "max-h-0 py-0"
			)}>
				<div className="flex flex-col items-center gap-6 text-secondary">
					<Link
						className={cn(
							"transition-colors duration-200 hover:text-primary",
							selectedIndex === 0 ? "text-primary" : "",
						)}
						viewTransition
						to={"my-worlds"}
						onClick={() => setMobileMenuOpen(false)}
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
						onClick={() => setMobileMenuOpen(false)}
					>
						Библиотека
					</Link>

					<Link
						viewTransition
						to={"/toast-demo"}
						className={cn(
							"transition-colors duration-200 hover:text-primary",
							selectedIndex === 3 ? "text-primary" : "",
						)}
						onClick={() => setMobileMenuOpen(false)}
					>
						Уведомления
					</Link>
				</div>
			</div>
		</div>
	);
}

export default Navbar;
