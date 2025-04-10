import { Navigate, Route, Routes } from "react-router-dom";

import Layout from "../layout/Layout.tsx";
import CoinDetails from "../pages/coinDetail/CoinDetails.tsx";
import CoinList from "../pages/home/CoinList.tsx";

function RouterProvider() {
  return (
    <Routes>
      {/* <Route path="/" element={<Navigate to="/" replace />} /> */}
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<CoinList />} />
        <Route path="/coin/:id" element={<CoinDetails />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default RouterProvider;
