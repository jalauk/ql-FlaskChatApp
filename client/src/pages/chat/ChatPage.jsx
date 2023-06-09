import axios from "axios";
import {io} from "socket.io-client"
import Chat from "./components/Chat"
import Archived from "./components/Archived";
import {useNavigate } from 'react-router-dom';
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
    const navigate = useNavigate();
    const [chatList,setChatList] = useState([])
    const [isLoggedIn,setIsLoggedIn] = useState(false)
    const [friendsList,setFriendsList] = useState([])
    const [currentChat,setCurrentChat] = useState(undefined)
    const [previousChat,setPreviousChat] = useState(undefined)
    const [currentUser,setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")))

    useEffect(() => {
        const reloadPage = localStorage.getItem('reload');
        if (reloadPage === '1') {
           localStorage.setItem('reload', '0');
           window.location.reload();
        }
    }, []);

    function sortSideBar(data) {
        return data.sort(function(a, b){
            var dateB = new Date(b.message_time)
            if (a.message_time) {
                var dateA = new Date(a.message_time)
            } else {
                var dateA = new Date(a.chat_created_at)
            }
            return dateA < dateB ? 1 : -1;
        })
    }

    useEffect(() => {
        function settingCurUser(){
            if (!localStorage.getItem("user")){
                navigate("/");
            }
            else{
                setIsLoggedIn(true)
            }
        }
        settingCurUser()
      }, [isLoggedIn]);

    useEffect(() => {
        async function getUser() {
            const response = await axios.get(
                `${process.env.REACT_APP_BASE_URL}/api/user/get-user`,
                {
                    headers: {
                        "Authorization" : `Bearer ${localStorage.getItem("access_token")}`
                    }
                }
            )
            if(localStorage.getItem("user"))
                localStorage.setItem("user",JSON.stringify(response.data.data))
        }
        if(isLoggedIn)
            getUser()
    },[currentUser])

    useEffect(() => {
        if(isLoggedIn){    
            socket.current = io(`${process.env.REACT_APP_BASE_URL}`)
            socket.current.on("connect",() => {
                socket.current.emit("add-user",currentUser._id.$oid)
            })
        }
        // socket.current.on("disconnect",()=>{
        //     socket.current.emit("offline",currentUser._id.$oid,(data) => alert(data))
        // })
    },[isLoggedIn])

    useEffect(()=>{
        async function settingFriendsList(){
            let access_token = localStorage.getItem("access_token")
            const friends_list = await axios.get(
                `${process.env.REACT_APP_BASE_URL}/api/user/get-all-users`,
                {
                    headers: {
                        "Authorization" : `Bearer ${access_token}`
                    }
                }
            )
            setFriendsList(friends_list.data.data)
        }
        if(isLoggedIn)
            settingFriendsList()
    },[currentChat,isLoggedIn])

    useEffect(()=>{
        async function settingChatList(){
            let access_token = localStorage.getItem("access_token")
            const chat_list = await axios.get(
                `${process.env.REACT_APP_BASE_URL}/api/user/get-all-chats`,
                {
                    headers: {
                        "Authorization" : `Bearer ${access_token}`
                    }
                }
            )
            console.log("chats : ",chat_list.data.data)
            const sorted_chat_list = sortSideBar(chat_list.data.data)
            console.log("chats : ",sorted_chat_list)
            setChatList(sorted_chat_list)
        }

        if(isLoggedIn)
            settingChatList()
    },[currentChat,isLoggedIn])

    const handleChatChange = (chat) => {
        setPreviousChat(currentChat)
        setCurrentChat(chat)
    }

    useEffect(() => {
        if(isLoggedIn){    
            socket.current.on("user-online",(data) => {
                const temp = structuredClone(chatList)
                for(let i=0;i<temp.length;i++){
                    if(temp[i]._id.$oid === data)
                    {
                        temp[i].online = true
                    }
                }
                console.log('temp', temp);
                setChatList(temp)
            })
        }

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
    },[chatList,isLoggedIn])

    useEffect(() => {
        if(isLoggedIn){
            socket.current.on(
                "unread-count",
                (data) => {
                    const new_chat_list = structuredClone(chatList);
                    let room_exist = false
                    new_chat_list.forEach((chat,index) => {
                        if(chat.room_id === data.room_id){
                            chat.message = data.message
                            chat.unread_count = data.unread_count
                            chat.message_time = data.time
                            room_exist = true
                        }
                    })
                    if(!room_exist){
                        socket.current.emit(
                            "get-room-detail",
                            {
                                room_id:data.room_id,
                                user_id:currentUser._id.$oid
                            },
                            (data) => new_chat_list.push(data)
                        )
                    }
                    console.log('new_chat_list - 181', new_chat_list);
                    const sorted_chat_list = sortSideBar(new_chat_list)
                    console.log('sorted_chat_list - 181', sorted_chat_list);
                    setChatList(sorted_chat_list)
                })
        }
    },[chatList,isLoggedIn])

    function refectChangesOnChatbarAfterSendingMessage(data) {
        
        const new_chat_list = structuredClone(chatList);
        new_chat_list.forEach((chat,index) => {
            if(chat.room_id === data.room_id && currentUser._id.$oid===data.from){
                chat.message = data.message
                chat.unread_count = 0
                chat.message_time = data.time
            }
            if(chat.room_id === data.room_id && currentUser._id.$oid!==data.from){
                chat.message = data.message
                chat.message_time = data.time
            }
        })
        console.log('new_chat_list - 204', new_chat_list);
        const sorted_chat_list = sortSideBar(new_chat_list)
        console.log('sorted_chat_list - 206', sorted_chat_list);
        setChatList(sorted_chat_list)
    }

    function appendGroupInChatList(group_info){
        const new_chat_list = structuredClone(chatList);
        new_chat_list.push(group_info)
        console.log('new_chat_list - 212', new_chat_list);
        setChatList(new_chat_list)
    }

    function updateImage(imageURL){
        let update_current_user = structuredClone(currentUser)
        update_current_user.profile = imageURL
        setCurrentUser(update_current_user)
    }


    return (
        <div>
            <CreateGroup chatList={chatList} currentUser={currentUser} appendGroupInChatList={appendGroupInChatList}/>
            <EditProfile currentUser={currentUser} updateImage={updateImage}/>
            <div className="layout" >
                <Navigation currentUser={currentUser} />
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
                    <SidebarGroup currentUser={currentUser}/>
                </div>
            </div>
        </div>
    )
}

export default ChatPage;