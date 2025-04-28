import { cn } from "@/lib/utils";
import { Link } from "react-router";
import { useUserStore } from "../model/store";
import AvatarIcon from "./images/AvatarIcon.svg";
import AvatarIconActive from "./images/AvatarIconActive.svg";
function Avatar({ selected = false }: { selected?: boolean }) {
	const { username } = useUserStore();
	const isLoged: boolean = !!username;

	console.log(username);

	return (
		<Link to={isLoged ? "/profile" : "/auth"}>
			<div
				className={cn(
					"flex text-secondary font-medium items-center",
					selected && "text-primary",
				)}
			>
				<div className="flex">{isLoged ? username : "Войти"}</div>

				<img
					src={selected ? AvatarIconActive : AvatarIcon}
					className="scale-70"
					alt=""
				/>
			</div>
		</Link>
	);
}

export default Avatar;
