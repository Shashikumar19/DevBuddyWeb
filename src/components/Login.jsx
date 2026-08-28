import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from '../utils/userSlice';
import { baseUrl } from '../utils/constants';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [isLoginFormEnable,setIsLoginFormEnable] =useState(true);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = () => {

        axios.post(baseUrl + '/login', { email, password }, { withCredentials: true })
            .then(response => {
                dispatch(addUser(response.data.data));
                navigate('/');
            })
            .catch(error => {
                toast.error(error?.response?.data)
                console.error('Login error:', error);
            });
    };

    const handleSignUp = () => {

        axios.post(baseUrl + '/signup', { email, password,firstName,lastName }, { withCredentials: true })
            .then(response => {
                dispatch(addUser(response.data.data));
                navigate('/profile');
            })
            .catch(error => {
                toast.error(error?.response?.data)
                console.error('Login error:', error);
            });
    };

    return <div className="flex justify-center items-center bg-base-100 mt-32">

        <fieldset className="fieldset bg-neutral border-base-300 rounded-box w-md border p-10 justify-center">
            <div className="text-2xl font-bold mb-4 text-center">{isLoginFormEnable ? 'Log in to DevBuddy' :'SignUp to DevBuddy'}</div>
            
            {!isLoginFormEnable &&
            <div>
            <label className="label mb-1">First Name</label>
             <input
                type="text"
                className="input w-md mb-1.5"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
            />

            <label className="label mb-1">Last Name</label>
            <input
                type="text"
                className="input w-md"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
            />
            </div>
            }
            <label className="label">Email</label>
            <input
                type="email"
                className="input w-md"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <label className="label">Password</label>
            <input
                type="password"
                className="input w-md"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button className="btn bg-accent mt-4" onClick={isLoginFormEnable ? handleLogin : handleSignUp}>{isLoginFormEnable ? 'Login' : "SignUp"}</button>
            <p onClick={()=> setIsLoginFormEnable((pre)=>!pre)} className="font-bold text-blue-600 transition-colors duration-500 ease-in-out hover:text-pink-500 cursor-pointer">{isLoginFormEnable ? "New user ? click here to SignUp" :"Existing user click here to LogIn"}</p>
        </fieldset>
    </div>
}
export default Login;