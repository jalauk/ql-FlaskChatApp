import axios from "axios"
import React,{useState} from "react"

function EditProfile({currentUser,updateImage}){
    const [image,setImage] = useState("")
    const [fullName,setFullName] = useState("")

    const [isLoading, setLoading] = useState(false)

    const submitImage = async () => {
        setLoading(true)
        const data = new FormData()
        data.append("file",image)
        data.append("upload_preset","uuxu9eun")
        data.append("cloud_name","dqv4wnzls")
        const response = await axios.post("https://api.cloudinary.com/v1_1/dqv4wnzls/image/upload",data,{
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
            }
        })

        const backendRes = await axios.patch(
            `${process.env.REACT_APP_BASE_URL}/api/user/edit-profile`
            ,{"profile":response.data.url,"name":fullName},
            {
                headers : {
                    "Authorization" : `Bearer ${localStorage.getItem("access_token")}`
                },
                
            }
        )
        
        updateImage(response.data.url)
        setLoading(false)
    }

    return (
        <div className="modal fade" id="editProfileModal" tabIndex="-1" role="dialog" aria-hidden="true">
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
                    {
                        isLoading ? <div className="loaderComponent"><img src="dist/media/loader.gif" alt="loader" /></div> :<div className="modal-body">
                        <div className="tab-content">
                            <div className="tab-pane show active" id="personal" role="tabpanel">
                                <div className="form-group">
                                    <label htmlFor="fullname" className="col-form-label">Full Name</label>
                                    <div className="input-group">
                                        <input type="text" className="form-control" id="fullname" onChange={(e) => setFullName(e.target.value)}/>
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
                                                {
                                                    currentUser?.profile ? 
                                                        <img src={currentUser?.profile} className="rounded-circle" alt="image"/> 
                                                    :
                                                        <img src="dist/media/img/profile-icon.webp" className="rounded-circle" alt="image"/>
                                                }
                                            </figure>
                                        </div>
                                        <div className="custom-file">
                                            <input type="file" className="custom-file-input" id="customFile" onChange={(e) => setImage(e.target.files[0])}/>
                                            <label className="custom-file-label" htmlFor="customFile">Choose file</label>
                                        </div>
                                        <button type="submit" className="btn btn-primary mx-3" onClick={submitImage}>Save</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    }
                    
                </div>
            </div>
        </div>
    )
}

export default EditProfile;