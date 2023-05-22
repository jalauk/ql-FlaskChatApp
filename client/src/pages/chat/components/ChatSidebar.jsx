import { useState } from "react";
import ChatItem from "./ChatItem";

function ChatSidebar({ chatList, changeChat }) {
  // console.log({chatList})
  const [currentSelected, setCurrentSelected] = useState(undefined);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  return (
    <div id="chats" className="sidebar active">
      <header>
        <span>Chats</span>
        <ul className="list-inline">
          <li
            className="list-inline-item"
            data-toggle="tooltip"
            title="New group"
          >
            <a
              className="btn btn-outline-light"
              onClick={ e => e.preventDefault() }
              data-toggle="modal"
              data-target="#newGroup"
            >
              <i data-feather="users"></i>
            </a>
          </li>
          <li className="list-inline-item">
            <a
              className="btn btn-outline-light"
              data-toggle="tooltip"
              title="New chat"
              onClick={ e => e.preventDefault() }
              data-navigation-target="friends"
            >
              <i data-feather="plus-circle"></i>
            </a>
          </li>
          <li className="list-inline-item d-xl-none d-inline">
            <a
              onClick={ e => e.preventDefault() }
              className="btn btn-outline-light text-danger sidebar-close"
            >
              <i data-feather="x"></i>
            </a>
          </li>
        </ul>
      </header>
      <form> 
        <input
          type="text"
          className="form-control"
          placeholder="Search chats"
        />
      </form>
      <div className="sidebar-body">
        <ul className="list-group list-group-flush">
          {chatList?.map((chat, index) => {
            return <ChatItem chat={chat} key={index} index={index} changeCurrentChat={changeCurrentChat} currentSelected={currentSelected}/>
          })}
        </ul>
      </div>
    </div>
  );
}

export default ChatSidebar;
