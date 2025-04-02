import { Route, Routes } from "react-router-dom";
import Layout from "../layout/layout.tsx";



function RouterProvider() {
  return (
      <Routes>
          {/*<Route path="/" element={<Navigate to="/" replace />} />*/}
          <Route path="/" element={<Layout />}>

          </Route>
      </Routes>

  );
}

export default RouterProvider;
