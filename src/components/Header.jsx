import ThemeToggle from "./ThemeToggle";

const Header = () => {
  return (
    <header className="w-full relative bg-white p-5 mb-10 text-center text-blue-950 shadow">
      <h1 className="text-3xl font-bold">My Task Manager</h1>
      <ThemeToggle />
    </header>
  );
};

export default Header;
