const Header = ({ download }) => {
  return (
    <header className="w-full fixed top-0 left-0">
      <nav className="w-full border-b-2 flex justify-between items-center px-20 h-28">
        <div></div>
        <button
          onClick={download}
          className="px-6 py-3 rounded-md border-2 hover:bg-white hover:text-gray-900 transition-all duration-300 font-bold"
        >
          Download
        </button>
      </nav>
    </header>
  );
};

export default Header;
