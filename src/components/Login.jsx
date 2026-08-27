import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from '../utils/userSlice';
import { baseUrl } from '../utils/constants';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
    const [email, setEmail] = useState('shashi@gmail.com');
    const [password, setPassword] = useState('Sushmita@1234');
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

    return <div className="flex justify-center items-center h-screen bg-base-200">

        <fieldset className="fieldset bg-neutral border-base-300 rounded-box w-md border p-10 justify-center">
            <div className="text-2xl font-bold mb-4 text-center">Log in to DevBuddy</div>
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

            <button className="btn bg-accent mt-4" onClick={handleLogin}>Login</button>
        </fieldset>
    </div>
}
export default Login;