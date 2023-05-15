import React,{useRef, useState} from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import MultipleSelectChip from "./Multiselect";


function CreateGroup({chatList,currentUser,appendGroupInChatList}){
    const closeModalRef= useRef(null);
    
    const [personName, setPersonName] = React.useState([]);

    const handleSubmit  = async (e)=>{
        e.preventDefault();
        const selected=[];
        selected.push(currentUser._id.$oid)
        for(let i=0;i<personName.length;i++){
            selected.push(personName[i]._id.$oid)
        }
        let response = await axios.post(
            "http://localhost:5000/api/user/create-group",
            {
                "participants" : selected,
                "group_name" : e.target[0].value
            },
            {
                headers : {
                    "Authorization" : `Bearer ${localStorage.getItem("access_token")}`
                },
                
            }
        )

        if(response.data.data){
            appendGroupInChatList(response.data.data)
        }
        closeModalRef.current.classList.remove("show");
    }

    function handlePersonName(value){
        setPersonName(
            typeof value === 'string' ? value.split(',') : value,
          );
    }
    return (
        <div className="modal fade" id="newGroup" tabndex="-1" role="dialog" aria-hidden="true" ref={closeModalRef}>
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
                        <form onSubmit={(e)=>handleSubmit(e)}>
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
                                    <div className="userList"  >
                                        {/* <select name="selectUser" multiple>    
                                            {
                                                chatList.map((e,index)=>{
                                                    return (e.is_group ? "" : <option value={e._id.$oid} key={index}>{e.username}</option> )
                                                })
                                            }
                                        </select> */}
                                        <MultipleSelectChip chatList={chatList} personName={personName} handlePersonName={handlePersonName}/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="description" className="col-form-label">Description</label>
                                <textarea className="form-control" id="description"></textarea>
                            </div>
                                <div className="modal-footer">
                                    <button type="submit" className="btn btn-primary" >Create Group</button>
                                </div>
                        </form>
                    </div>  
                </div>
            </div>
        </div>
    )
}

export default CreateGroup;