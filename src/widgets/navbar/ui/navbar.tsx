import { Avatar } from "@/entities/user";
import { cn } from "@/lib/utils";
import { Link } from "react-router";
import { useNavbarStore } from "../model/navbarState";
import IketelLogo from "./img/main-logo.svg";
import { useState } from "react";

function Navbar() {
	const { selectedIndex, setSelectedIndex } = useNavbarStore();
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	const toggleMobileMenu = () => {
		setMobileMenuOpen(!mobileMenuOpen);
	};

	return (
		<div className="relative top-0 w-full flex flex-col h-fit overflow-hidden font-medium">
			<div className="w-full flex items-center justify-between p-[8px] sm:p-[10px] md:p-[12px] bg-white">
				<button onClick={() => setSelectedIndex(0)} type="button">
					<img src={IketelLogo} alt="" className="scale-70" />
				</button>

				{/* Десктопное меню */}
				<div className="hidden md:flex gap-6 lg:gap-10 text-secondary">
					<Link
						className={cn(
							"transition-colors duration-200",
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
							"transition-colors duration-200",
							selectedIndex === 1 ? "text-primary" : "",
						)}
					>
						Библиотека
					</Link>
				</div>

				{/* Кнопка мобильного меню */}
				<button
					className="md:hidden flex flex-col justify-center items-center w-8 h-8"
					onClick={toggleMobileMenu}
				>
					<span className={`block w-6 h-0.5 bg-gray-600 transition-transform duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-1' : ''}`}></span>
					<span className={`block w-6 h-0.5 bg-gray-600 my-1 transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
					<span className={`block w-6 h-0.5 bg-gray-600 transition-transform duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-1' : ''}`}></span>
				</button>

				<div className="hidden md:block">
					<Avatar selected={selectedIndex === 2} />
				</div>
			</div>

			{/* Мобильное меню */}
			{mobileMenuOpen && (
				<div className="md:hidden w-full bg-white shadow-md animate-fadein">
					<div className="flex flex-col py-4">
						<Link
							className={cn(
								"py-3 px-6 transition-colors duration-200",
								selectedIndex === 0 ? "text-primary" : "text-secondary",
							)}
							viewTransition
							to={"my-worlds"}
							onClick={() => {
								setSelectedIndex(0);
								setMobileMenuOpen(false);
							}}
						>
							Мои мирки
						</Link>

						<Link
							viewTransition
							to={"/"}
							className={cn(
								"py-3 px-6 transition-colors duration-200",
								selectedIndex === 1 ? "text-primary" : "text-secondary",
							)}
							onClick={() => {
								setSelectedIndex(1);
								setMobileMenuOpen(false);
							}}
						>
							Библиотека
						</Link>

						<div className="py-3 px-6 border-t border-gray-100 mt-2">
							<Avatar selected={selectedIndex === 2} />
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default Navbar;
