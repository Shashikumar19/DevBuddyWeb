import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
const Body = () => {
    return <>
        <Navbar />
        <h1>Feed Page</h1>
        <Outlet />
        <Footer/>
    </>
}
export default Body