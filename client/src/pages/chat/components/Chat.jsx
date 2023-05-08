import axios from "axios";
import moment from "moment";
import ChatInput from "./ChatInput";
import { useState,useEffect,useRef } from "react";

function Chat({currentChat,currentUser,socket,previousChat,refectChangesOnChatbarAfterSendingMessage}){
    const [messages, setMessages] = useState([])
    const scrollRef = useRef()

    useEffect(() => {
        async function getAllMessages () {
            let messages_list = await axios.post(
                "http://localhost:5000/api/message/get-all-message",
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
                console.log("leave room")
            }
            console.log("previousChat : ",previousChat)
            socket.current.emit("create-room",{"user_id":currentUser._id.$oid,"friend_id":currentChat._id.$oid},(room_id) => {
                currentChat.room_id = room_id
            })
        }
        else{
            if(previousChat != undefined){ 
                // console.log("previousChat : ",previousChat)
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
            setMessages(tempMessage)
            // console.log({data})
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


    useEffect(()=> {
      scrollRef.current?.scrollIntoView({behaviour:"smooth"})
    },[messages]);


    return (
        <div className="chat">
            <div className="chat-header">
                <div className="chat-header-user">
                    <figure className="avatar">
                        <img src="dist/media/img/man_avatar3.jpg" className="rounded-circle" alt="image"/>
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


            <div className="chat-body">
                <div className="messages">
                    {
                        messages.map((message,index) => {
                            return (
                                <div key={index} ref={scrollRef} className={`message-item ${currentUser._id.$oid===message.from ? "outgoing-message" : ""}`}>
                                    <div className="message-avatar">
                                        <figure className="avatar">
                                            <img src="dist/media/img/women_avatar5.jpg" className="rounded-circle" alt="image"/>
                                        </figure>
                                        <div>
                                            <h5>{currentUser._id.$oid===message.from? currentUser.username : currentChat.username}</h5>
                                            <div className="time">{moment(message.time).format('lll')}<i className=
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