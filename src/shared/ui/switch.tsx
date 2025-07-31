function SwitchButton() {
  return (
    <label className="flex items-center cursor-pointer">
      <input type="checkbox" className="sr-only peer" />

      <div className="relative flex items-center h-6 w-11 bg-gray-200 rounded-full transition-colors duration-300 peer-checked:bg-blue-500">
        <span className="absolute left-1 h-4 w-4 bg-white rounded-full transition-transform duration-300 peer-checked:translate-x-5" />
      </div>
    </label>
  );
}

export default SwitchButton;
