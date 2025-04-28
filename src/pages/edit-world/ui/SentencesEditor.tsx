import AddNewWordRow from "./components/AddNewRow";

function SentencesEditor() {
	return (
		<div className="flex w-full mt-4 flex-col gap-3">
			<AddNewWordRow type="sentence" />
			<AddNewWordRow type="sentence" />
		</div>
	);
}

export default SentencesEditor;
