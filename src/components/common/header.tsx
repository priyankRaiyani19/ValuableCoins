import { FaSearch } from "react-icons/fa";

function Header() {
  return (

    <div className="flex justify-between p-[2rem] w-full text-white">
      <div className="header-name text-white text-[2rem] tracking-wider font-medium">
        CryptoS
      </div>
      <div className="flex items-center bg-transparent border-2 border-white rounded-lg px-[1rem] text-white ]">
        <input
          type="text"
          placeholder="Coin name..."
          className="w-full outline-0 text-[1rem] text-white"
        />
        <FaSearch className="text-[1.5rem]" />
      </div>
    </div>
  );
}

export default Header;
