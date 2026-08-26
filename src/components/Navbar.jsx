import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { baseUrl } from '../utils/constants';
import { removeUser } from '../utils/userSlice';
import { useDispatch } from "react-redux";

const Navbar = () => {

  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {

    axios.post(baseUrl + '/logout',{},{withCredentials:true})
      .then(response => {
        dispatch(removeUser());
        navigate('/login');
      })
      .catch(error => {
        console.error('Login error:', error);
      });

  };
  return <div className="navbar bg-neutral shadow-sm">
    <div className="flex-1">
      <a className="btn btn-ghost text-xl"> DevBuddy</a>
    </div>
    <div className="flex gap-2">

      {user && (
        <> <div>Welcome, {user.firstName}</div> <div className="dropdown dropdown-end mr-4">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src={user?.photoUrl || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} />
            </div>
          </div>
          <ul
            tabIndex={-1}
            className="menu menu-sm dropdown-content bg-neutral rounded-box z-1 mt-3 w-52 p-2 shadow">
            <li>
              <NavLink className="justify-between" to={'/profile'}>
                Profile
              </NavLink>
            </li>
            <li><a>Settings</a></li>
            <li><a onClick={handleLogout}>
              Logout
            </a></li>
          </ul>
        </div></>
      )
      }
    </div>
  </div>
}

export default Navbar;