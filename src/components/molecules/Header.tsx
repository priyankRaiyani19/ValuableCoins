import SearchBar from "./SearchBar.tsx";

function Header() {
  return (
    <div className="flex justify-between items-center w-full text-white py-6 relative px-6">
      {/* <div className="flex justify-between items-center w-full px-6"> */}
      <div className="text-white text-3xl font-semibold tracking-wide">
        CryptoS
      </div>
      <SearchBar />
      {/* </div> */}
    </div>
  );
}

export default Header;
