import moment from 'moment'

function ChatItem ({chat,index,changeCurrentChat,currentSelected}) {

  function formatingDate(date) {
    const current_date = new Date()
    date = new Date(date)
    if(current_date.getDate()-date.getDate()===1)
      return "yesterday"
    else if(current_date.getDate() - date.getDate() > 1)
      return moment(date).format("LL")
    else
      return moment(date).format('LT')
  }

    return (
            <li
                className={`list-group-item ${currentSelected===index ? 'open-chat' : ''}`}
                onClick={() => changeCurrentChat(index, chat)}
              >
                <figure
                  className={
                    chat.online === true
                      ? "avatar avatar-state-success"
                      : "avatar"
                  }
                >
                  {chat.is_group 
                      ? 
                          (<span className="avatar-title bg-warning bg-success rounded-circle">
                              <i className="fa fa-users"></i> 
                          </span>) 
                      : 
                        chat?.profile ? (<img src={chat?.profile} className="rounded-circle" alt="image"/>) : (<img src="dist/media/img/women_avatar5.jpg" className="rounded-circle" alt="image"/>)
                  }
                  {/* <img
                    src="dist/media/img/man_avatar1.jpg"
                    className="rounded-circle"
                    alt="image"
                  /> */}
                </figure>
                <div className="users-list-body">
                  <div>
                    <h5 className="text-primary">{chat.is_group ? chat.group_name : chat.username}</h5>
                    <p>
                      {chat.message === null
                        ? 
                            chat.is_group ? `Say hi to everyone` : `Say hi to ${chat.username}`
                        : 
                            chat.message
                        }
                    </p>
                  </div>
                  <div className="users-list-action">
                    <div className={`new-message-count ${chat.unread_count === 0 ? "hide-element" : ""}`}>{chat.unread_count}</div>
                    <small className="text-primary">
                      {chat.message_time === null ? null : formatingDate(chat.message_time)}
                    </small>
                  </div>
                </div>
              </li>
            )
}

export default ChatItem;