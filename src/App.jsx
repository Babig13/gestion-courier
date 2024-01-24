import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import User from "./pages/User";
import CreateUser from "./pages/CreateUser";
import EditUser from "./pages/EditUser";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import PrivateComponent from "./components/PrivateComponent";

function App() {
  return (
    <>
      <BrowserRouter>
        {/* <Routes>
          <Route path={"/"} element={<Login />} />
          <Route path={"/admin"} element={<Admin />} />
          <Route path={"/admin/createuser"} element={<CreateUser />} />
          <Route path={"/admin/:firm_name"} element={<EditUser />} />
          <Route path={"/user/:firm_name"} element={<User />} />
        </Routes> */}
        <Routes>
          <Route path={"/"} element={<Login />} />
          <Route path={"/user/:firm_name"} element={<User />} />

          <Route element={<PrivateComponent />}>
            <Route path={"/admin"} element={<Admin />} />
            <Route path={"/admin/createuser"} element={<CreateUser />} />
            <Route path={"/admin/:firm_name"} element={<EditUser />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
