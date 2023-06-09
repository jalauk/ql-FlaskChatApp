function Favorites(){
    return <div id="favorites" className="sidebar">
    <header>
        <span>Favorites</span>
        <ul className="list-inline">
            <li className="list-inline-item d-xl-none d-inline">
                <a onClick={ e => e.preventDefault() } className="btn btn-outline-light text-danger sidebar-close">
                    <i data-feather="x"></i>
                </a>
            </li>
        </ul>
    </header>
    <form>
        <input type="text" className="form-control" placeholder="Search favorites"/>
    </form>
    <div className="sidebar-body">
        <ul className="list-group list-group-flush users-list">
            <li className="list-group-item">
                <div className="users-list-body">
                    <div>
                        <h5>Jennica Kindred</h5>
                        <p>I know how important this file is to you. You can trust me ;)</p>
                    </div>
                    <div className="users-list-action">
                        <div className="action-toggle">
                            <div className="dropdown">
                                <a data-toggle="dropdown" onClick={ e => e.preventDefault() }>
                                    <i data-feather="more-horizontal"></i>
                                </a>
                                <div className="dropdown-menu dropdown-menu-right">
                                    <a onClick={ e => e.preventDefault() } className="dropdown-item">Open</a>
                                    <a onClick={ e => e.preventDefault() } className="dropdown-item">Remove favorites</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
            <li className="list-group-item">
                <div className="users-list-body">
                    <div>
                        <h5>Marvin Rohan</h5>
                        <p>Lorem ipsum dolor sitsdc sdcsdc sdcsdcs</p>
                    </div>
                    <div className="users-list-action">
                        <div className="action-toggle">
                            <div className="dropdown">
                                <a data-toggle="dropdown" onClick={ e => e.preventDefault() }>
                                    <i data-feather="more-horizontal"></i>
                                </a>
                                <div className="dropdown-menu dropdown-menu-right">
                                    <a onClick={ e => e.preventDefault() } className="dropdown-item">Open</a>
                                    <a onClick={ e => e.preventDefault() } className="dropdown-item">Remove favorites</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
            <li className="list-group-item">
                <div className="users-list-body">
                    <div>
                        <h5>Frans Hanscombe</h5>
                        <p>Lorem ipsum dolor sitsdc sdcsdc sdcsdcs</p>
                    </div>
                    <div className="users-list-action">
                        <div className="action-toggle">
                            <div className="dropdown">
                                <a data-toggle="dropdown" onClick={ e => e.preventDefault() }>
                                    <i data-feather="more-horizontal"></i>
                                </a>
                                <div className="dropdown-menu dropdown-menu-right">
                                    <a onClick={ e => e.preventDefault() } className="dropdown-item">Open</a>
                                    <a onClick={ e => e.preventDefault() } className="dropdown-item">Remove favorites</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
            <li className="list-group-item">
                <div className="users-list-body">
                    <div>
                        <h5>Karl Hubane</h5>
                        <p>Lorem ipsum dolor sitsdc sdcsdc sdcsdcs</p>
                    </div>
                    <div className="users-list-action">
                        <div className="action-toggle">
                            <div className="dropdown">
                                <a data-toggle="dropdown" onClick={ e => e.preventDefault() }>
                                    <i data-feather="more-horizontal"></i>
                                </a>
                                <div className="dropdown-menu dropdown-menu-right">
                                    <a onClick={ e => e.preventDefault() } className="dropdown-item">Open</a>
                                    <a onClick={ e => e.preventDefault() } className="dropdown-item">Remove favorites</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</div>
}

export default Favorites;