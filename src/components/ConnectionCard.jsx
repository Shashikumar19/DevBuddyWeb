import { useSelector } from "react-redux";
const ConnectionCard = () => {
    const connectionList = useSelector(store => store.connections);

    if (connectionList?.length == 0) return <div className="flex justify-center mt-3.5">
        <div className="aura text-orange-600 bg-yellow-200 w-xl">
            <div className="card bg-base-100 text-base-content">
                <div className="card-body text-center">
                    <p>No Connections Found</p>
                </div>
            </div>
        </div>
    </div>


    return connectionList && connectionList.map((user) =>
        <div className=" flex justify-center">
            <div className="card bg-neutral text-neutral-content mt-3.5 p-4 w-xl">
                <div className="flex items-center gap-10">
                    <div className="avatar">
                        <div className="ring-primary ring-offset-base-100 w-20 rounded-full ring-2 ring-offset-2">
                            <img alt="user photo" src={user?.photoUrl}/>
                        </div>
                    </div>
                    <div>
                        <h2 className="card-title">{user?.firstName + " " + user?.lastName}</h2>
                        <p>{user?.age || ""}</p>
                        <p>{user?.about}</p>
                    </div>
                </div>
            </div>
        </div>
    )


}

export default ConnectionCard;