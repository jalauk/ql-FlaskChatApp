function CreateGroup(){
    return (
        <div className="modal fade" id="newGroup" tabndex="-1" role="dialog" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-dialog-zoom" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">
                            <i data-feather="users" className="mr-2"></i> New Group
                        </h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <i className="ti-close"></i>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="form-group">
                                <label htmlFor="group_name" className="col-form-label">Group name</label>
                                <div className="input-group">
                                    <input type="text" className="form-control" id="group_name"/>
                                    <div className="input-group-append">
                                        <button className="btn btn-light" data-toggle="tooltip" title="Emoji" type="button">
                                            <i data-feather="smile"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <p className="mb-2">The group members</p>
                            <div className="form-group">
                                <div className="avatar-group">
                                    <figure className="avatar" data-toggle="tooltip" title="Tobit Spraging">
                                        <span className="avatar-title bg-success rounded-circle">T</span>
                                    </figure>
                                    <figure className="avatar" data-toggle="tooltip" title="Cloe Jeayes">
                                        <img src="dist/media/img/women_avatar4.jpg" className="rounded-circle" alt="image"/>
                                    </figure>
                                    <figure className="avatar" data-toggle="tooltip" title="Marlee Perazzo">
                                        <span className="avatar-title bg-warning rounded-circle">M</span>
                                    </figure>
                                    <figure className="avatar" data-toggle="tooltip" title="Stafford Pioch">
                                        <img src="dist/media/img/man_avatar1.jpg" className="rounded-circle" alt="image"/>
                                    </figure>
                                    <figure className="avatar" data-toggle="tooltip" title="Bethena Langsdon">
                                        <span className="avatar-title bg-info rounded-circle">B</span>
                                    </figure>
                                    <a href="#" title="Add friends">
                                        <figure className="avatar">
                                            <span className="avatar-title bg-primary rounded-circle">
                                                <i data-feather="plus"></i>
                                            </span>
                                        </figure>
                                    </a>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="description" className="col-form-label">Description</label>
                                <textarea className="form-control" id="description"></textarea>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary">Create Group</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateGroup;