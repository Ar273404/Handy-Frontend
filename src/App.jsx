import { Outlet } from "react-router-dom";
import Navbar from "./component/Navbar.jsx";

function App() {

  return (
    <>
      <Navbar/>
      <Outlet/>
    </>
  )
}

export default App;
