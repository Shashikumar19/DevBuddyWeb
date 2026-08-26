import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector ,useDispatch} from "react-redux";
import axios from "axios";
import { baseUrl } from "../utils/constants";
import { useEffect } from "react";
import { addUser } from "../utils/userSlice";
const Body = () => {
     const dispatch = useDispatch();
     const navigate = useNavigate();
     const user = useSelector(store => store.user);

    const fetchUser = async () => {
        try {
            const data = await axios.get(baseUrl + '/profile/view',{withCredentials:true});
             dispatch(addUser(data.data));
        } catch (error) {
             navigate('/login') 
            console.log("Error", error)
        }


    }

    useEffect(() => {
        fetchUser();
    }, [])

    return <>
        <Navbar />
        <Outlet />
        <Footer />
    </>
}
export default Body