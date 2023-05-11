import axios from "axios";
import {io} from "socket.io-client"
import Chat from "./components/Chat"
import Archived from "./components/Archived";
import Favorites from "./components/Favorites";
import Navigation from "./components/Navigation";
import { useState,useEffect,useRef } from "react";
import EditProfile from "./components/EditProfile";
import ChatSidebar from "./components/ChatSidebar";
import CreateGroup from "./components/CreateGroup";
import SidebarGroup from "./components/SidebarGroup";
import FriendsSidebar from "./components/FriendsSidebar";

function ChatPage () {
    const socket = useRef();
    const [chatList,setChatList] = useState([])
    const [friendsList,setFriendsList] = useState([])
    const [currentChat,setCurrentChat] = useState(undefined)
    const [previousChat,setPreviousChat] = useState(undefined)
    const [currentUser,setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")))

    // useEffect(()=>{
    //     async function settingCurrentUser(){
    //         setCurrentUser())
    //     }
    //     settingCurrentUser();
    // },[])

    useEffect(() => {
        socket.current = io("http://localhost:5000")
        socket.current.on("connect",() => {
            socket.current.emit("add-user",currentUser._id.$oid)
        })
        // socket.current.on("disconnect",()=>{
        //     socket.current.emit("offline",currentUser._id.$oid,(data) => alert(data))
        // })
    },[])

    useEffect(()=>{
        async function settingFriendsList(){
            let access_token = localStorage.getItem("access_token")
            const friends_list = await axios.get(
                "http://localhost:5000/api/user/get-all-users",
                {
                    headers: {
                        "Authorization" : `Bearer ${access_token}`
                    }
                }
            )
            setFriendsList(friends_list.data.data)
        }
        settingFriendsList()
    },[currentChat])

    useEffect(()=>{
        async function settingChatList(){
            let access_token = localStorage.getItem("access_token")
            const chat_list = await axios.get(
                "http://localhost:5000/api/user/get-all-chats",
                {
                    headers: {
                        "Authorization" : `Bearer ${access_token}`
                    }
                }
            )
            const sorted_chat_list = chat_list.data.data.sort(function(a, b){
                // console.log("sorting datetime : ",a," : ",typeof(a.message_time))
                var dateA = new Date(a.message_time)
                var dateB = new Date(b.message_time)
                return dateA < dateB ? 1 : -1;
            })
            setChatList(sorted_chat_list)
        }
        settingChatList()
    },[currentChat])

    const handleChatChange = (chat) => {
        setPreviousChat(currentChat)
        setCurrentChat(chat)
    }

    useEffect(() => {
        socket.current.on("user-online",(data) => {
            const temp = structuredClone(chatList)
            for(let i=0;i<temp.length;i++){
                // console.log("inside for")
                // console.log(data," ",temp[i]._id.$oid)
                if(temp[i]._id.$oid === data)
                {
                    // console.log("inside if")
                    temp[i].online = true
                }
            }
            // console.log({temp});
            setChatList(temp)
        })

        // socket.current.on("user-offline",(data) => {
        //     alert("disconnecting")
        //     const disconnect_list = chatList.map((chat,index) => {
        //         if(chat._id.$oid === data)
        //         {
        //             chat.online = false
        //         }
        //     })
        //     setChatList(disconnect_list)
        // })
    },[chatList])
    // console.log({chatList});

    useEffect(() => {
        socket.current.on(
            "unread-count",
            (data) => {
                const new_chat_list = structuredClone(chatList);
                new_chat_list.forEach((chat,index) => {
                    if(chat.room_id === data.room_id){
                        chat.message = data.message
                        chat.unread_count = data.unread_count
                        chat.message_time = data.time
                    }
                })
                const sorted_chat_list = new_chat_list.sort(function(a, b){
                    var dateA = new Date(a.message_time)
                    var dateB = new Date(b.message_time)
                    // console.log(a.message_time," : ",dateA," and ",b.message_time," : ",dateB);
                    return dateA < dateB ? 1 : -1;
                })
                setChatList(new_chat_list)
            })
    },[chatList])

    function refectChangesOnChatbarAfterSendingMessage(data) {
        const new_chat_list = structuredClone(chatList);
        new_chat_list.forEach((chat,index) => {
            // console.log(index," : ",chat.message_time," ",new Date(chat.message_time))
            if(chat.room_id === data.room_id && currentUser._id.$oid===data.from){
                chat.message = data.message
                chat.unread_count = 0
                chat.message_time = data.time
            }
            if(chat.room_id === data.room_id && currentUser._id.$oid!==data.from){
                chat.message = data.message
                // chat.unread_count = 0
                chat.message_time = data.time
            }
        })
        const sorted_chat_list = new_chat_list.sort(function(a, b){
            var dateA = new Date(a.message_time)
            var dateB = new Date(b.message_time)
            // console.log(a.message_time," : ",dateA," and ",b.message_time," : ",dateB);
            return dateA < dateB ? 1 : -1;
        })
        setChatList(sorted_chat_list)
    }

    function appendGroupInChatList(group_info){
        const new_chat_list = structuredClone(chatList);
        new_chat_list.push(group_info)
        setChatList(new_chat_list)
    }


    return (
        <div>
            <CreateGroup chatList={chatList} currentUser={currentUser} appendGroupInChatList={appendGroupInChatList}/>
            <EditProfile/>
            <div className="layout" >
                <Navigation currentUser={currentUser}/>
                <div className="content">
                    <div className="sidebar-group">
                        <ChatSidebar chatList={chatList} changeChat={handleChatChange}/>
                        <FriendsSidebar friendsList={friendsList} changeChat={handleChatChange}/>
                        <Favorites/>
                        <Archived/>
                    </div>
                    {
                        currentChat === undefined ? 
                        (<div className="container m-0, p-0">
                            <img className="chat-bg-img" src="/bg image.webp"></img>
                        </div>) :
                        (<Chat currentChat={currentChat} currentUser={currentUser} socket={socket} previousChat={previousChat} refectChangesOnChatbarAfterSendingMessage={refectChangesOnChatbarAfterSendingMessage}/>)

                    }
                    <SidebarGroup/>
                </div>
            </div>
        </div>
    )
}

export default ChatPage;