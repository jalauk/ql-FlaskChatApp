import { useState } from "react";

function ChatInput({handleSendMessage,socket,currentUser,currentChat}) {
    const [message,setMessage] = useState("");

    const typing = (e) => {
        setMessage(e.target.value)
        socket.current.emit("is-typing",{"from":currentUser._id.$oid,"room_id":currentChat.room_id})
    }

    const sendChat = (e) =>{
        e.preventDefault();
        if(message.length>0){
            handleSendMessage(message)
            setMessage('');
        }
    }
    return (
        <form onSubmit={(e) => sendChat(e)}>
            <div>
                <button className="btn btn-light mr-3" data-toggle="tooltip" title="Emoji" type="button">
                    <i data-feather="smile"></i>
                </button>
            </div>
            <input type="text" className="form-control" placeholder="Write a message." name="message" value={message} onChange={(e) => typing(e)}/>
            <div className="form-buttons">
                <button className="btn btn-light" data-toggle="tooltip" title="Add files" type="button">
                    <i data-feather="paperclip"></i>
                </button>
                <button className="btn btn-light d-sm-none d-block" data-toggle="tooltip"
                        title="Send a voice record" type="button">
                    <i data-feather="mic"></i>
                </button>
                <button className="btn btn-primary" type="submit">
                    <i data-feather="send"></i>
                    submit
                </button>
            </div>
        </form>
    )
}

export default ChatInput;