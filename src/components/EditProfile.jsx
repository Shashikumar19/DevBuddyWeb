import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from '../utils/userSlice';
import { baseUrl } from '../utils/constants';
import { toast } from "react-toastify";
import Card from "./Card";

const EditProfile = ({ user }) => {

    const [email, setEmail] = useState(user?.email);
    const [firstName, setFirstName] = useState(user?.firstName);
    const [lastName, setLastName] = useState(user?.lastName);
    const [gender, setGender] = useState(user?.gender);
    const [photoUrl, setPhotoUrl] = useState(user?.photoUrl);
    const [about, setAbout] = useState(user?.about);
    const [skill, setSkill] = useState(Array.isArray(user?.skill) ? user?.skill.join(',') : '');
    const [age, setAge] = useState(user?.age);
    const [error, setError] = useState('');
    ;
    const dispatch = useDispatch();

    const handleSave = async () => {
        setError('')
        try {
            const rawskill = skill.split(',');
            const data = await axios.patch(baseUrl + '/profile/edit', { email, firstName, lastName, gender, photoUrl, about, skill: rawskill, age }, { withCredentials: true });
            dispatch(addUser(data?.data?.data));
            toast.dark(`${data?.data?.data?.firstName},your profile updated successfully`)
        } catch (error) {
            setError(error?.response?.data)
            console.error('Error:', error);
        };
    }

    return <div className="flex justify-center gap-24 mt-3.5 pb-12">
        <div className="flex justify-center items-center">

            <fieldset className="fieldset bg-base-300 border-base-300 rounded-box w-md border p-10 justify-center">
                <div className="text-2xl font-bold mb-4 text-center">Edit Profile</div>
                <label className="label">First Name </label>
                <input
                    type="text"
                    className="input w-md"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />

                <label className="label">Last Name</label>
                <input
                    type="text"
                    className="input w-md"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
                <label className="label">Email </label>
                <input
                    type="email"
                    className="input w-md"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <label className="label">Age</label>
                <input
                    type="number"
                    className="input w-md"
                    placeholder="Age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                />
                <label className="label">Gender</label>
                <input
                    type="text"
                    className="input w-md"
                    placeholder="Gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                />
                <label className="label">about</label>
                <input
                    type="text"
                    className="input w-md"
                    placeholder="About"
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                />
                <label className="label">photoUrl</label>
                <input
                    type="text"
                    className="input w-md"
                    placeholder="Photo URL"
                    value={photoUrl}
                    onChange={(e) => setPhotoUrl(e.target.value)}
                />
                <label className="label">Skills</label>
                <input
                    type="text"
                    className="input w-md"
                    placeholder="Skills"
                    value={skill}
                    onChange={(e) => setSkill(e.target.value)}
                />
                <div className="text-orange-600
 text-lg">{error}</div>
                <button className="btn bg-accent mt-4" onClick={handleSave}>Save Profile</button>
            </fieldset>
        </div>
        <div><Card user={{ firstName, lastName, about, age, skill, photoUrl, gender }}/></div>
    </div>
}
export default EditProfile;