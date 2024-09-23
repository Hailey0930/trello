import { useTheme } from "next-themes";

export default function DashboardHeader() {
  const { theme, setTheme } = useTheme();

  const handleChangeTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <header className="h-14 bg-sky-400 flex items-center justify-between px-5 text-white dark:bg-sky-900">
      <div>Dashboard</div>
      <button
        type="button"
        onClick={handleChangeTheme}
        className="w-14 h-8 flex items-center rounded-full p-1 bg-gray-300 dark:bg-gray-700"
      >
        <div
          className={`w-6 h-6 bg-white rounded-full shadow-md transform duration-300 ease-in-out ${
            theme === "dark" ? "translate-x-6" : ""
          }`}
        />
      </button>
    </header>
  );
}
