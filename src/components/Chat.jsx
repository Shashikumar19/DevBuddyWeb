import { useEffect, useRef, useState } from "react"
import { createSoketConnection } from "../utils/soketConnection"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import axios from "axios"
import { baseUrl } from "../utils/constants"


const Chat = () => {

    const [message, setMessage] = useState([])
    const messagesContainerRef = useRef(null);
    const [sendMessage, setSendMessage] = useState("");
    const { targetUser } = useParams();
    const user = useSelector(store => store.user);
    const userId = user?._id;
    let socket;

    useEffect(() => {
        if (userId) {
            socket = createSoketConnection();
            socket.emit('chatjoin', { targetUser, userId });
            socket.on('messageRecieved', ({ firstName, message }) => {
                console.log("Message recieved", { firstName, message })
                setMessage(pre => [...pre, { firstName, message }]);
            })
        }

        return () => {
            if (socket) {
                socket.disconnect();
            }
        }

    }, [userId])

    useEffect(() => {
        const messagesContainer = messagesContainerRef.current;
        if (messagesContainer) {
            messagesContainer.scrollTo({
                top: messagesContainer.scrollHeight,
                behavior: 'smooth'
            });
        }
    }, [message]);

    useEffect(() => {
      getAllPreviousChats();
    }, [userId])

    const getAllPreviousChats = async () => {
        try {
            const data = await axios.get(baseUrl + '/chat/' + targetUser, { withCredentials: true });
            console.log(data.data.messages)
            setMessage(pre => [...pre,   ...data.data.messages])
        } catch (error) {
            console.log("error", error)

        }
    }

    const sendMessageHandler = (e) => {

        if (!sendMessage) return alert('please enter valid mesage to send')
        const socket = createSoketConnection();
        socket.emit('sendMessage', { firstName: user.firstName, targetUser, userId, message: sendMessage });
        setSendMessage('');

    }



    return <div className="flex justify-center h-150 mt-5">

        <div className="relative w-3xl border-2 border-black">
            <div className=" border-b-2 p-3 border-black text-center font-bold text-xl">
                Chat
            </div>
            <div ref={messagesContainerRef} className="h-120 overflow-auto scroll-auto">
                {message && message?.map((item, index) => <div className="p-2" key={`${item.firstName}-${index}`}>

                    {item.firstName !== user?.firstName ?
                        <div className="chat chat-start">
                            <div className="chat-image avatar">
                                <div className="w-10 rounded-full">
                                    <img
                                        alt="Tailwind CSS chat bubble component"
                                        src="https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
                                    />
                                </div>
                            </div>
                            <div
                                className="chat-header">
                                {item?.firstName}
                                <time className="text-xs opacity-50">12:45</time>
                            </div>
                            <div className="chat-bubble">{item?.message}</div>
                            <div className="chat-footer opacity-50">Delivered</div>
                        </div> :

                        <div className="chat chat-end">
                            <div className="chat-image avatar">
                                <div className="w-10 rounded-full">
                                    <img
                                        alt="Tailwind CSS chat bubble component"
                                        src="https://img.daisyui.com/images/profile/demo/anakeen@192.webp"
                                    />
                                </div>
                            </div>
                            <div className="chat-header">
                                {item?.firstName}
                                <time className="text-xs opacity-50">12:46</time>
                            </div>
                            <div className="chat-bubble">{item?.message}</div>
                            <div className="chat-footer opacity-50">Seen at 12:46</div>
                        </div>}
                </div>)}
            </div>
            <div className="absolute bottom-0 flex border-t-2 w-3xl p-3 border-black space-x-2">
                <input type="text" placeholder="Type here" className="input w-2xl border-2 bg-black" value={sendMessage} onChange={(e) => setSendMessage(e.target.value)} />
                <button className="btn btn-secondary" onClick={sendMessageHandler}>Send</button>
            </div>
        </div>
    </div>
}
export default Chat