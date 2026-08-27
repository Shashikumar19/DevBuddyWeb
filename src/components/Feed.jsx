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

    return <div className="flex justify-center mt-5">
       {feed && <Card user={feed[0]}/>}
    </div>
}
export default Feed