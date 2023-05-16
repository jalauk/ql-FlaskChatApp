import axios from "axios";
import moment from "moment";
import ChatInput from "./ChatInput";
import { useState,useEffect,useRef } from "react";

function Chat({currentChat,currentUser,socket,previousChat,refectChangesOnChatbarAfterSendingMessage}){
    const [messages, setMessages] = useState([])
    const scrollRef = useRef()
    const listInnerRef = useRef();
    const [page,setPage] = useState(1)
    const [prevFetch,setPrevFetch] = useState(false)
    useEffect(() => {
        setPrevFetch(false)
    },[currentChat])

    useEffect(() => {
        async function getAllMessages () {
            let messages_list = await axios.post(
                `http://localhost:5000/api/message/get-all-message?page=0`,
                {
                    "room_id" : currentChat.room_id
                },
                {
                    headers : {
                        "Authorization" : `Bearer ${localStorage.getItem("access_token")}`
                    },
                    
                }
            )
            setMessages(messages_list.data.data)    
        }

        async function leaveRoom() {
            if(currentChat){
                socket.current.emit("leave-room", {
                    "room_id":previousChat.room_id,
                    "user_id":currentUser._id.$oid
                }, (data)=>{});
            }
        }

        if(!("room_id" in currentChat)){
            if(previousChat != undefined){
                leaveRoom()
            }
            console.log("previousChat : ",previousChat)
            socket.current.emit("create-room",{"user_id":currentUser._id.$oid,"friend_id":currentChat._id.$oid},(room_id) => {
                currentChat.room_id = room_id
            })
            setMessages([])
        }
        else{
            if(previousChat != undefined){ 
                leaveRoom()
            }

            socket.current.emit(
                "join-room",
                {
                    "room_id" : currentChat.room_id,
                    "from" : currentUser._id.$oid,
                    "to" : currentChat._id.$oid,
                },
                (data) => {
                    // alert("working")
                    // console.log("joinroom : ",data)
                }
            )
            getAllMessages();
        }
    },[currentChat])

    const handleSendMessage = (message) => {
        socket.current.emit(
            "send-message",
            {
                "room_id" : currentChat.room_id,
                "from" : currentUser._id.$oid,
                "to" : currentChat._id.$oid,
                "message" : message
            })

            // socket.current.on("receive-message",(data) => {
            //     console.log("messages1 : ",messages)
            //     let tempMessage = [...messages]
            //     tempMessage.push(data)
            //     console.log("tempmessage : ",tempMessage)
            //     setMessages(tempMessage)
            //     console.log("messages2 : ",messages)
            // })
        
        // console.log(message)
        // let tempMessage = [...messages]
        // console.log(tempMessage)
        // tempMessage.push({"message" : message,"from" : currentUser._id.$oid})
        // console.log(tempMessage)
        // setMessages(tempMessage)
        // tempMessage = []
        // console.log("messages1 : ",messages)
    }
    
    useEffect(()=>{
      if(socket.current) {
        socket.current.on("receive-message",(data) => {
            let tempMessage = [...messages]
            tempMessage.push(data)
            // console.log("seen by : ",data.seen_by.length)
            setMessages(tempMessage)
            // console.log({data})
            setPrevFetch(false)
            refectChangesOnChatbarAfterSendingMessage(data)
        })
      }
    },[messages])

    function timer() {
        setTimeout(() => {
            document.getElementById("typing").style.display = "none"
        },2000);
    }

    useEffect(() => {
        socket.current.on("typing",(data) => {
            // console.log(data, " : ",currentUser._id.$oid)
            if(data.from != currentUser._id.$oid)
            {    
                document.getElementById("typing").style.display = "block"
                timer();
            }
        })
    },[])

    const onScroll = async () => {
        if (listInnerRef.current) {
          const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
          console.log({scrollTop})
          if (scrollTop== 0) {
            
            let messages_list = await axios.post(
                `http://localhost:5000/api/message/get-all-message?page=${page}`,
                {
                    "room_id" : currentChat.room_id
                },
                {
                    headers : {
                        "Authorization" : `Bearer ${localStorage.getItem("access_token")}`
                    },
                    
                }
            )
            setPrevFetch(true)
            setMessages((prev) => [...messages_list.data.data,...prev])    
            setPage((prev) => prev + 1);
          }
        }
      };

    function getGroupParticipantUsername(participants,from){
        for(let i=0;i<participants.length;i++){
            if(participants[i]._id.$oid === from)
                return participants[i].username
        }
    }

    function formatDate(date){
        const current_date = new Date()
        date = new Date(date)
        if(current_date.getDate()-date.getDate()===1)
            return `yesterday, ${moment(date).format('LT')}`
        else if(current_date.getDate()-date.getDate() < 1)
            return moment(date).format('LT')
        else
            return moment(date).format('lll')
    }

    useEffect(() => {
        socket.current.on("message-seen",((data) => {
            console.log("seen_messages event")
            if(currentChat.room_id === data.room_id){
                const seen_messages = structuredClone(messages);
                seen_messages.forEach((message,index) => {
                    message.seen_by = currentChat._id.$oid
                })
                setMessages(seen_messages)
            }
        }))
    })

    useEffect(()=> {
        if(!prevFetch){
            scrollRef.current?.scrollIntoView({behaviour:"smooth"})
        }
    },[messages]);


    return (
        <div className="chat">
            <div className="chat-header">
                <div className="chat-header-user">
                    <figure className="avatar">
                        {
                            currentChat?.profile 
                                ? 
                                    <img src={currentChat?.profile} className="rounded-circle" alt="image"/>
                                : 
                                    <img src="dist/media/img/man_avatar1.jpg" className="rounded-circle" alt="image"/>
                        }
                    </figure>
                    <div>
                        <h5>{currentChat.is_group ? currentChat.group_name : currentChat.username}</h5>
                        <small className="text-success" id="typing" style={{display:"none"}}>
                            <i>writing...</i>
                        </small>
                    </div>
                </div>

                {/* useless part */}
                <div className="chat-header-action" style={{display:"none"}}>
                    <ul className="list-inline">
                        <li className="list-inline-item d-xl-none d-inline">
                            <a href="#" className="btn btn-outline-light mobile-navigation-button">
                                <i data-feather="menu"></i>
                            </a>
                        </li>
                        <li className="list-inline-item" data-toggle="tooltip" title="Voice call">
                            <a href="#" className="btn btn-outline-light text-success" data-toggle="modal"
                            data-target="#call">
                                <i data-feather="phone"></i>
                            </a>
                        </li>
                        <li className="list-inline-item" data-toggle="tooltip" title="Video call">
                            <a href="#" className="btn btn-outline-light text-warning" data-toggle="modal"
                            data-target="#videoCall">
                                <i data-feather="video"></i>
                            </a>
                        </li>
                        <li className="list-inline-item">
                            <a href="#" className="btn btn-outline-light" data-toggle="dropdown">
                                <i data-feather="more-horizontal"></i>
                            </a>
                            <div className="dropdown-menu dropdown-menu-right">
                                <a href="#" data-navigation-target="contact-information"
                                className="dropdown-item">Profile</a>
                                <a href="#" className="dropdown-item">Add to archive</a>
                                <a href="#" className="dropdown-item">Delete</a>
                                <div className="dropdown-divider"></div>
                                <a href="#" className="dropdown-item text-danger">Block</a>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>


            <div className="chat-body" onScroll={onScroll} ref={listInnerRef}>
                <div className="messages">
                        {
                            messages.map((message,index) => {
                                return (
                                    <div key={index} ref={scrollRef} className={`message-item ${currentUser._id.$oid===message.from ? "outgoing-message" : ""}`}>
                                        <div className="message-avatar">
                                            <figure className="avatar">
                                                {
                                                    currentUser._id.$oid===message.from 
                                                        ?
                                                            <img src={currentUser?.profile} className="rounded-circle" alt="image"/>  
                                                        : 
                                                            <img src={currentChat?.profile} className="rounded-circle" alt="image"/> 

                                                }
                                           </figure>
                                            <div>
                                                <h5>{currentChat.is_group 
                                                        ? 
                                                            currentUser._id.$oid===message.from 
                                                            ? 
                                                                currentUser.username 
                                                            : 
                                                                getGroupParticipantUsername(currentChat.participants,message.from)
                                                        : 
                                                            currentUser._id.$oid===message.from? currentUser.username : currentChat.username}</h5>
                                                            
                                                <div className="time">{formatDate(message.time)}<i className=
                                                    {
                                                        message.from === currentUser._id.$oid 
                                                        ? 
                                                            message.seen_by.length > 0 ? 'ti-double-check text-info' : "" 
                                                        : 
                                                            ""
                                                    }></i></div>
                                            </div>
                                        </div>
                                        <div className="message-content">
                                            {message.message}
                                        </div>
                                    </div>
                                )
                            })
                        }
                    
                </div>
            </div>
            <div className="chat-footer">
                <ChatInput handleSendMessage={handleSendMessage} socket={socket} currentUser={currentUser} currentChat={currentChat}/>
            </div>
        </div>
    )
}

export default Chat;