import { useState } from "react";

function FriendsSidebar({friendsList,changeChat}){
    const [currentSelected,setCurrentSelected] = useState(undefined)

    const changeCurrentChat = (index,contact) => {
        setCurrentSelected(index);
        changeChat(contact)  
    }

    return <div id="friends" className="sidebar">
    <header>
        <span>Friends</span>
        <ul className="list-inline">
            <li className="list-inline-item" data-toggle="tooltip" title="Add friends">
                <a className="btn btn-outline-light" onClick={ e => e.preventDefault() } data-toggle="modal" data-target="#addFriends">
                    <i data-feather="user-plus"></i>
                </a>
            </li>
            <li className="list-inline-item d-xl-none d-inline">
                <a onClick={ e => e.preventDefault() } className="btn btn-outline-light text-danger sidebar-close">
                    <i data-feather="x"></i>
                </a>
            </li>
        </ul>
    </header>
    <form >
        <input type="text" className="form-control" placeholder="Search friends"/>
    </form>
    <div className="sidebar-body">
        <ul className="list-group list-group-flush">
        {
            friendsList?.map((friend,index) => {
                return (
                    <li key={friend._id.$oid} className="list-group-item" data-navigation-target="chats" onClick={() => changeCurrentChat(index, friend)}>
                        <div>
                            <figure className="avatar">
                                {
                                    friend.profile 
                                        ? 
                                            <img src={friend?.profile} className="rounded-circle" alt="image"/>
                                        : 
                                            <img src="dist/media/img/profile-icon.webp" className="rounded-circle" alt="image"/>
                                }
                            </figure>
                        </div>
                        <div className="users-list-body">
                            <div>
                                <h5>{friend.username}</h5>
                            </div>
                            <div className="users-list-action">
                                <div className="action-toggle">
                                    <div className="dropdown">
                                        <a data-toggle="dropdown" onClick={ e => e.preventDefault() }>
                                            <i data-feather="more-horizontal"></i>
                                        </a>
                                        <div className="dropdown-menu dropdown-menu-right">
                                            <a onClick={ e => e.preventDefault() } className="dropdown-item">New chat</a>
                                            <a onClick={ e => e.preventDefault() } data-navigation-target="contact-information"
                                            className="dropdown-item">Profile</a>
                                            <div className="dropdown-divider"></div>
                                            <a onClick={ e => e.preventDefault() } className="dropdown-item text-danger">Block</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                )
            })
        }    
        </ul>
    </div>
</div>
}

export default FriendsSidebar;