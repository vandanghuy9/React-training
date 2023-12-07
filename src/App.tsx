import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "./layouts";
import { StateContext } from "./context/StateContext";
const HomePage = lazy(() => import("./page/HomePage"));
const Map = lazy(() => import("./page/Map"));
const Table = lazy(() => import("./page/Table"));
const Building = lazy(() => import("./page/building/Building"));
const CreateBuildingForm = lazy(
  () => import("./page/building/CreateBuildingForm")
);
import { LinearProgress } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UpdateBuildingForm from "./page/building/UpdateBuildingForm";
import CreateRoomForm from "./page/room/CreateRoomForm";
const App = () => {
  return (
    <div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <StateContext>
        <Layout>
          <Suspense
            fallback={
              <LinearProgress
                style={{
                  position: "fixed",
                  top: 0,
                  left: -250,
                  width: "calc(100% + 300px)",
                  zIndex: 1202,
                }}
              />
            }
          >
            <Routes>
              <Route path="/grid" element={<Table />} />
              <Route path="/map" element={<Map />} />
              <Route path="/" element={<HomePage />} />
              <Route path="/building">
                <Route path=":id" element={<Building />}></Route>
                <Route path="create" element={<CreateBuildingForm />}></Route>
                <Route
                  path="update/:buildingId"
                  element={<UpdateBuildingForm />}
                ></Route>
                <Route path=":id/create" element={<CreateRoomForm />}></Route>
              </Route>
            </Routes>
          </Suspense>
        </Layout>
      </StateContext>
    </div>
  );
};

export default App;
