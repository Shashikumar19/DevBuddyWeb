import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequests } from "../utils/requestsSlice";
import { baseUrl } from "../utils/constants";
const Requests = () => {
    const dispatch = useDispatch();
    const requestList = useSelector(store => store.requests);

    const fetchRequests = async () => {
        try {
            const requests = await axios.get(baseUrl + '/user/request/received', { withCredentials: true });
            dispatch(addRequests(requests.data.data));
        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        if (!requestList) {
            fetchRequests();
        }

    }, [])


    const handleAcceptRequest = async (connectionId) => {
        try {
            const requests = await axios.post(baseUrl + `/request/review/accepted/${connectionId}`, {}, { withCredentials: true });
            dispatch(removeRequests(requests.data.data));
        } catch (error) {
            console.log(error);
        }

    }
    const handleRejectRequest = async (connectionId) => {
        try {
            const requests = await axios.post(baseUrl + `/request/review/rejected/${connectionId}`, {}, { withCredentials: true });
            dispatch(addRequests(requests.data.data));
        } catch (error) {
            console.log(error);
        }

    }
    if (requestList?.length == 0) return <div className="flex justify-center mt-3.5">
        <div className="aura text-orange-600 bg-yellow-200 w-xl">
            <div className="card bg-base-100 text-base-content">
                <div className="card-body text-center">
                    <p>No Requests Available</p>
                </div>
            </div>
        </div>
    </div>

    return requestList && requestList?.map((user) =>
        <div className=" flex justify-center">
            <div className="card bg-neutral text-neutral-content mt-3.5 p-4 w-xl">
                <div className="flex gap-4">
                    <div className="avatar">
                        <div className="ring-primary ring-offset-base-100 w-20 rounded-full ring-2 ring-offset-2">
                            <img alt="user photo" src={user?.photoUrl} />
                        </div>
                    </div>
                    <div>
                        <h2 className="card-title">{user?.firstName + " " + user?.lastName}</h2>
                        <p>{user?.age || ""}</p>
                        <p>{user?.about}</p>
                    </div>
                    <div className="flex gap-2.5 items-center">
                        <button className="btn btn-secondary" onClick={() => { handleAcceptRequest(user?._id) }}>Accept</button>
                        <button className="btn btn-primary" onClick={() => { handleRejectRequest(user?._id) }}>Reject</button>
                    </div>
                </div>
            </div>

        </div>
    )


}

export default Requests;