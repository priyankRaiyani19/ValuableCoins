import { Route, Routes } from "react-router-dom";

import Layout from "../components/templates/layout.tsx";
import CoinDetails from "../pages/detail/CoinDetails.tsx";
import CoinList from "../pages/table/CoinList.tsx";

function RouterProvider() {
  return (
    <Routes>
      {/* <Route path="/" element={<Navigate to="/" replace />} /> */}
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<CoinList />} />
        <Route path="/coin/:id" element={<CoinDetails />} />

      </Route>
    </Routes>
  );
}

export default RouterProvider;
