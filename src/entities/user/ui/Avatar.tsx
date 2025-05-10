import { cn } from "@/lib/utils";
import { Link } from "react-router";
import { useUserStore } from "../model/store";
import AvatarIcon from "./images/AvatarIcon.svg";
import AvatarIconActive from "./images/AvatarIconActive.svg";

function Avatar({ selected = false }: { selected?: boolean }) {
	const { username } = useUserStore();
	const isLoged: boolean = !!username;

	return (
		<Link to={isLoged ? "/profile" : "/auth"}>
			<div
				className={cn(
					"flex text-secondary font-medium items-center gap-1 transition-colors duration-200 hover:text-primary",
					selected && "text-primary",
				)}
			>
				<div className="hidden sm:flex">{isLoged ? username : "Войти"}</div>

				<img
					src={selected ? AvatarIconActive : AvatarIcon}
					className="scale-70"
					alt={isLoged ? "Профиль" : "Войти"}
					title={isLoged ? username : "Войти"}
				/>
			</div>
		</Link>
	);
}

export default Avatar;
