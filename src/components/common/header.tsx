import { FaSearch } from "react-icons/fa";

function Header() {
  return (

     <div className={`flex justify-between p-[2rem] w-full`}>
         <div className={`text-white text-[2rem]`}>
             No 1. Stocks
         </div>
         <div className="flex items-center bg-white rounded-lg p-[0.5rem] ]">
             <input
                 type="text"
                 placeholder="Search Name"
                 className=" outline-none w-full text-sm"
             />
             <FaSearch/>
         </div>
     </div>
  );
}

export default Header;
