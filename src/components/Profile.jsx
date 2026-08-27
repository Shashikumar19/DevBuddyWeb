
import { useSelector } from "react-redux";
import Card from "./Card";
import EditProfile from "./EditProfile";

const Profile = () => {

    const user = useSelector(store => store.user);
    return <div>
       {user && <EditProfile user={user} loggedInUser={true}/>}
    </div>
}
export default Profile;