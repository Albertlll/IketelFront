import { Button } from "./shared/button";
import { Input } from "./shared/input";
import Tabs from "./widgets/tabs";

function App() {
	return (
		<>
			<Input placeholder="Пароль" />
			<Button>Кнопка</Button>
			<Tabs
				elements={[
					{
						title: "test",
						element: <div>fvd</div>,
					},
					{
						title: "test",
						element: <div>fvd</div>,
					},
				]}
			/>
		</>
	);
}

export default App;
