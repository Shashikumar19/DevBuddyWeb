import axios from "axios";
import { useEffect } from "react";
import { baseUrl } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import ConnectionCard from "./ConnectionCard";
const Connections = () => {
   const dispatch = useDispatch();

   const fetchConnections = async () => {
      try {
         const connectionList = await axios.get(baseUrl + '/user/connections', { withCredentials: true });
         dispatch(addConnections(connectionList?.data?.data));
      } catch (error) {
         console.log("Error", error.message)
      }

   }

   useEffect(() => {
      fetchConnections();
   }, [])
   
   return <div>
      <ConnectionCard />
   </div>
}
export default Connections;