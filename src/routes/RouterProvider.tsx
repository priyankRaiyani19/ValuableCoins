import { Route, Routes } from "react-router-dom";

import Layout from "../layout/layout.tsx";
import CoinList from "../pages/table/CoinList.tsx";

function RouterProvider() {
  return (
    <Routes>
      {/* <Route path="/" element={<Navigate to="/" replace />} /> */}
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<CoinList />} />
      </Route>
    </Routes>
  );
}

export default RouterProvider;
