import favicon from "../../assets/Adobe Express - file.png";
import SearchBar from "./SearchBar.tsx";

function Header() {
  return (
    <div className="flex justify-between items-center w-full text-white py-6 relative px-6">
      {/* <div className="flex justify-between items-center w-full px-6"> */}
      <div className="flex  justify-center items-center gap-[0.5rem]">
        <img src={favicon} alt="not found" />
        <div className="text-white text-3xl font-semibold tracking-wide">
          CryptoS
        </div>
      </div>
      <SearchBar />
      {/* </div> */}
    </div>
  );
}

export default Header;
