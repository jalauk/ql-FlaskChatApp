function SidebarGroup({currentUser}){
    return  (
        <div className="sidebar-group">
            <div id="contact-information" className="sidebar">
                <header>
                    <span>Profile</span>
                    <ul className="list-inline">
                        <li className="list-inline-item">
                            <a href="#" className="btn btn-outline-light text-danger sidebar-close">
                                <i data-feather="x"></i>
                            </a>
                        </li>
                    </ul>
                </header>
                <div className="sidebar-body">
                    <div className="pl-4 pr-4">
                        <div className="text-center">
                            <figure className="avatar avatar-xl mb-4">
                                <img src={currentUser.profile} className="rounded-circle" alt="image"/>
                            </figure>
                            <h5 className="mb-1">{currentUser.username}</h5>
                            <small className="text-muted font-italic">Last seen: Today</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     )
}

export default SidebarGroup;