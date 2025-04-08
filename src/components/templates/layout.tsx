import { Outlet } from "react-router-dom";

import Header from "../molecules/header.tsx";

function Layout() {
  return (
    <div className={`flex flex-col  bg-[#210c73] `}>
      <Header />
      <div className="grow w-full h-full">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
