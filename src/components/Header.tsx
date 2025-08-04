import ThemeToggle from "./ThemeToggle";

const Header = () => {
  return (
    <header className="w-full flex justify-between items-center px-[4%] py-4 mb-10 text-center text-primary shadow">
      <h1 className="text-3xl font-semibold">Task Manager</h1>
      <ThemeToggle />
    </header>
  );
};

export default Header;
