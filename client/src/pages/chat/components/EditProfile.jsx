function EditProfile(){
    return (
        <div className="modal fade" id="editProfileModal" tabindex="-1" role="dialog" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-dialog-zoom" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">
                            <i data-feather="edit-2" className="mr-2"></i> Edit Profile
                        </h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <i className="ti-close"></i>
                        </button>
                    </div>
                    <div className="modal-body">
                        <ul className="nav nav-tabs" role="tablist">
                            <li className="nav-item">
                                <a className="nav-link active" data-toggle="tab" href="#personal" role="tab"
                                aria-controls="personal" aria-selected="true">Personal</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" data-toggle="tab" href="#about" role="tab" aria-controls="about"
                                aria-selected="false">About</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" data-toggle="tab" href="#social-links" role="tab"
                                aria-controls="social-links" aria-selected="false">Social Links</a>
                            </li>
                        </ul>
                        <div className="tab-content">
                            <div className="tab-pane show active" id="personal" role="tabpanel">
                                <form>
                                    <div className="form-group">
                                        <label for="fullname" className="col-form-label">Fullname</label>
                                        <div className="input-group">
                                            <input type="text" className="form-control" id="fullname"/>
                                            <div className="input-group-append">
                                                <span className="input-group-text">
                                                    <i data-feather="user"></i>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-form-label">Avatar</label>
                                        <div className="d-flex align-items-center">
                                            <div>
                                                <figure className="avatar mr-3 item-rtl">
                                                    <img src="dist/media/img/man_avatar4.jpg" className="rounded-circle"
                                                        alt="image"/>
                                                </figure>
                                            </div>
                                            <div className="custom-file">
                                                <input type="file" className="custom-file-input" id="customFile"/>
                                                <label className="custom-file-label" for="customFile">Choose file</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label for="city" className="col-form-label">City</label>
                                        <div className="input-group">
                                            <input type="text" className="form-control" id="city" placeholder="Ex: Columbia"/>
                                            <div className="input-group-append">
                                                <span className="input-group-text">
                                                    <i data-feather="target"></i>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label for="phone" className="col-form-label">Phone</label>
                                        <div className="input-group">
                                            <input type="text" className="form-control" id="phone" placeholder="(555) 555 55 55"/>
                                            <div className="input-group-append">
                                                <span className="input-group-text">
                                                    <i data-feather="phone"></i>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label for="website" className="col-form-label">Website</label>
                                        <input type="text" className="form-control" id="website" placeholder="https:///"/>
                                    </div>
                                </form>
                            </div>
                            <div className="tab-pane" id="about" role="tabpanel">
                                <form>
                                    <div className="form-group">
                                        <label for="about-text" className="col-form-label">Write a few words that describe
                                            you</label>
                                        <textarea className="form-control" id="about-text"></textarea>
                                    </div>
                                    <div className="custom-control custom-checkbox">
                                        <input type="checkbox" className="custom-control-input" checked id="customCheck1"/>
                                        <label className="custom-control-label" for="customCheck1">View profile</label>
                                    </div>
                                </form>
                            </div>
                            <div className="tab-pane" id="social-links" role="tabpanel">
                                <form>
                                    <div className="form-group">
                                        <div className="input-group">
                                            <input type="text" className="form-control" placeholder="Username"/>
                                            <div className="input-group-append">
                                                <span className="input-group-text bg-facebook">
                                                    <i className="ti-facebook"></i>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="input-group">
                                            <input type="text" className="form-control" placeholder="Username"/>
                                            <div className="input-group-append">
                                                <span className="input-group-text bg-twitter">
                                                    <i className="ti-twitter"></i>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="input-group">
                                            <input type="text" className="form-control" placeholder="Username"/>
                                            <div className="input-group-append">
                                                <span className="input-group-text bg-instagram">
                                                    <i className="ti-instagram"></i>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="input-group">
                                            <input type="text" className="form-control" placeholder="Username"/>
                                            <div className="input-group-append">
                                                <span className="input-group-text bg-linkedin">
                                                    <i className="ti-linkedin"></i>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="input-group">
                                            <input type="text" className="form-control" placeholder="Username"/>
                                            <div className="input-group-append">
                                                <span className="input-group-text bg-dribbble">
                                                    <i className="ti-dribbble"></i>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="input-group">
                                            <input type="text" className="form-control" placeholder="Username"/>
                                            <div className="input-group-append">
                                                <span className="input-group-text bg-youtube">
                                                    <i className="ti-youtube"></i>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="input-group">
                                            <input type="text" className="form-control" placeholder="Username"/>
                                            <div className="input-group-append">
                                                <span className="input-group-text bg-google">
                                                    <i className="ti-google"></i>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="input-group">
                                            <input type="text" className="form-control" placeholder="Username"/>
                                            <div className="input-group-append">
                                                <span className="input-group-text bg-whatsapp">
                                                    <i className="fa fa-whatsapp"></i>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary">Save</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditProfile;