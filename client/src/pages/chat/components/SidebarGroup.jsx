function SidebarGroup(){
    return  <div className="sidebar-group">
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
                        <img src="dist/media/img/women_avatar5.jpg" className="rounded-circle" alt="image"/>
                    </figure>
                    <h5 className="mb-1">Mirabelle Tow</h5>
                    <small className="text-muted font-italic">Last seen: Today</small>

                    <ul className="nav nav-tabs justify-content-center mt-5" id="myTab" role="tablist">
                        <li className="nav-item">
                            <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab"
                               aria-controls="home" aria-selected="true">About</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab"
                               aria-controls="profile" aria-selected="false">Media</a>
                        </li>
                    </ul>
                </div>
                <div className="tab-content" id="myTabContent">
                    <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                        <p className="text-muted">Lorem ipsum is a pseudo-Latin text used in web design, typography,
                            layout, and printing in place of English to emphasise design elements over content.
                            It's also called placeholder (or filler) text. It's a convenient tool for
                            mock-ups.</p>
                        <div className="mt-4 mb-4">
                            <h6>Phone</h6>
                            <p className="text-muted">(555) 555 55 55</p>
                        </div>
                        <div className="mt-4 mb-4">
                            <h6>City</h6>
                            <p className="text-muted">Germany / Berlin</p>
                        </div>
                        <div className="mt-4 mb-4">
                            <h6>Website</h6>
                            <p>
                                <a href="#">www.franshanscombe.com</a>
                            </p>
                        </div>
                        <div className="mt-4 mb-4">
                            <h6 className="mb-3">Social media accounts</h6>
                            <ul className="list-inline social-links">
                                <li className="list-inline-item">
                                    <a href="#" className="btn btn-sm btn-floating btn-facebook"
                                       data-toggle="tooltip" title="Facebook">
                                        <i className="fa fa-facebook"></i>
                                    </a>
                                </li>
                                <li className="list-inline-item">
                                    <a href="#" className="btn btn-sm btn-floating btn-twitter"
                                       data-toggle="tooltip" title="Twitter">
                                        <i className="fa fa-twitter"></i>
                                    </a>
                                </li>
                                <li className="list-inline-item">
                                    <a href="#" className="btn btn-sm btn-floating btn-dribbble"
                                       data-toggle="tooltip" title="Dribbble">
                                        <i className="fa fa-dribbble"></i>
                                    </a>
                                </li>
                                <li className="list-inline-item">
                                    <a href="#" className="btn btn-sm btn-floating btn-whatsapp"
                                       data-toggle="tooltip" title="Whatsapp">
                                        <i className="fa fa-whatsapp"></i>
                                    </a>
                                </li>
                                <li className="list-inline-item">
                                    <a href="#" className="btn btn-sm btn-floating btn-linkedin"
                                       data-toggle="tooltip" title="Linkedin">
                                        <i className="fa fa-linkedin"></i>
                                    </a>
                                </li>
                                <li className="list-inline-item">
                                    <a href="#" className="btn btn-sm btn-floating btn-google" data-toggle="tooltip"
                                       title="Google">
                                        <i className="fa fa-google"></i>
                                    </a>
                                </li>
                                <li className="list-inline-item">
                                    <a href="#" className="btn btn-sm btn-floating btn-behance"
                                       data-toggle="tooltip" title="Behance">
                                        <i className="fa fa-behance"></i>
                                    </a>
                                </li>
                                <li className="list-inline-item">
                                    <a href="#" className="btn btn-sm btn-floating btn-instagram"
                                       data-toggle="tooltip" title="Instagram">
                                        <i className="fa fa-instagram"></i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="mt-4 mb-4">
                            <h6 className="mb-3">Settings</h6>
                            <div className="form-group">
                                <div className="form-item custom-control custom-switch">
                                    <input type="checkbox" className="custom-control-input" id="customSwitch11"/>
                                    <label className="custom-control-label" htmlFor="customSwitch11">Block</label>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="form-item custom-control custom-switch">
                                    <input type="checkbox" className="custom-control-input" checked="" readOnly
                                           id="customSwitch12"/>
                                    <label className="custom-control-label" htmlFor="customSwitch12">Mute</label>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="form-item custom-control custom-switch">
                                    <input type="checkbox" className="custom-control-input" id="customSwitch13"/>
                                    <label className="custom-control-label" htmlFor="customSwitch13">Get
                                        notification</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                        <h6 className="mb-3 d-flex align-items-center justify-content-between">
                            <span>Recent Files</span>
                            <a href="#" className="btn btn-link small">
                                <i data-feather="upload" className="mr-2"></i> Upload
                            </a>
                        </h6>
                        <div>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item pl-0 pr-0 d-flex align-items-center">
                                    <a href="#">
                                        <i className="fa fa-file-pdf-o text-danger mr-2"></i> report4221.pdf
                                    </a>
                                </li>
                                <li className="list-group-item pl-0 pr-0 d-flex align-items-center">
                                    <a href="#">
                                        <i className="fa fa-image text-muted mr-2"></i> avatar_image.png
                                    </a>
                                </li>
                                <li className="list-group-item pl-0 pr-0 d-flex align-items-center">
                                    <a href="#">
                                        <i className="fa fa-file-excel-o text-success mr-2"></i>
                                        excel_report_file2020.xlsx
                                    </a>
                                </li>
                                <li className="list-group-item pl-0 pr-0 d-flex align-items-center">
                                    <a href="#">
                                        <i className="fa fa-file-text-o text-warning mr-2"></i> articles342133.txt
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
}

export default SidebarGroup;