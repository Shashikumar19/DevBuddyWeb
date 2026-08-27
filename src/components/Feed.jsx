import axios from "axios"
import { useEffect } from "react";
import { baseUrl } from "../utils/constants";
import { addFeed } from "../utils/feedSlice";
import { useDispatch, useSelector } from "react-redux";
import Card from "./Card";

const Feed = () => {
    const dispatch = useDispatch();
    const feed = useSelector(store => store.feed);

    console.log("FeedList", feed)
    const fetchFeed = async () => {
        try {
            const feed = await axios.get(baseUrl + '/user/feed', { withCredentials: true });
            dispatch(addFeed(feed.data.data))
        } catch (error) {
            console.log("Error:", error)
        }
    }

    useEffect(() => {
        if (!feed) {
            fetchFeed()
        }
    }, [])
    
    if (feed?.length == 0 || !feed) return <div className="flex justify-center mt-3.5">
        <div className="aura text-orange-600 bg-yellow-200 w-xl">
            <div className="card bg-base-100 text-base-content">
                <div className="card-body text-center">
                    <p>No Feed Found</p>
                </div>
            </div>
        </div>
    </div>
    return <div className="flex justify-center mt-5">
        <div className="stack">
        <Card user={feed[0]} />
        </div>
       
    </div>
}
export default Feed