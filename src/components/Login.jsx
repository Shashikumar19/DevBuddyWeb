import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from '../utils/userSlice';
import { baseUrl } from '../utils/constants';
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState('shashi@gmail.com');
    const [password, setPassword] = useState('Shashi@123');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = () => {

        axios.post(baseUrl + '/login', { email, password }, { withCredentials: true })
            .then(response => {
                dispatch(addUser(response.data.data));
                navigate('/');
            })
            .catch(error => {
                console.error('Login error:', error);
            });
    };

    return <div className="flex justify-center items-center h-screen bg-base-200">

        <fieldset className="fieldset bg-base-300 border-base-300 rounded-box w-xs border p-4">
            <div className="text-2xl font-bold mb-4 text-center">Login</div>
            <label className="label">Email</label>
            <input
                type="email"
                className="input"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <label className="label">Password</label>
            <input
                type="password"
                className="input"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button className="btn btn-neutral mt-4" onClick={handleLogin}>Login</button>
        </fieldset>
    </div>
}
export default Login;