import { useState } from "react";
import "./App.css";
import HomePage from "./component/HomePage";
import { Route, Routes } from "react-router-dom";
import UserMasterOperations from "./component/userMaster/UserMasterOperations";
import ListUserMaster from "./component/listing/ListUserMaster";
import { MyContextProvider } from "./source/context/MyContext";
import UserAddresses from "./component/userAddresses/UserAddresses";
import UpdateUserMaster from "./component/updatingUserMaster/UpdateUserMaster";
import ListAllUserAddresses from "./component/listing/ListAllUserAddresses";

function App() {
  return (
    <div className="container">
      <MyContextProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>

        <Routes>
          <Route
            path="/UserMasterOperations"
            element={<UserMasterOperations />}
          />
        </Routes>

        <Routes>
          <Route path="/listUserMaster" element={<ListUserMaster />} />
        </Routes>

        <Routes>
          <Route path="/addUserAddress" element={<UserAddresses />} />
        </Routes>

        <Routes>
          <Route path="/UpdateUserMaster" element={<UpdateUserMaster />} />
        </Routes>

        <Routes>
          <Route path="/getAllAddresses" element={<ListAllUserAddresses />} />
        </Routes>
      </MyContextProvider>
    </div>
  );
}

export default App;
