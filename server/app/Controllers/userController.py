from flask import request,Blueprint
from app.services import userService
from app.utils.helper import httpResponse
from app.middlewares.validationMiddleware import validate
from app.middlewares.authMiddleware import refreshAuth,auth
from app.schemas.userSchema import signup_schema,login_schema,create_group

bp = Blueprint("user",__name__,url_prefix="/api/user")

@bp.post("/signup")
@validate(signup_schema)
def signup():
    username = request.json["username"]
    email = request.json["email"]
    password = request.json["password"] 
    data = userService.signup(username,email,password)
    if data:
        return data
    return httpResponse(201,"Success")

@bp.post("/login")
@validate(login_schema)
def login():
    email = request.json["email"]
    password = request.json["password"] 
    return userService.login(email,password)

@bp.get("/reset-token")
@refreshAuth
def resetToken():
    data = userService.resetToken(request.user_id,request.token)
    return httpResponse(200,"Success",data)

@bp.get("/get-user")
@auth
def getUser():
    data = userService.getUser(request.user_id)
    return httpResponse(200,"Success",data)

@bp.get("/get-all-users")
@auth
def getAllUsers():
    data = userService.getAllUsers(request.user_id)
    return httpResponse(200,"Success",data)

@bp.get("/get-all-chats")
@auth
def getAllChats():
    data = userService.getAllChats(request.user_id)
    return httpResponse(200,"Success",data)

@bp.post("/create-group")
@auth
@validate(create_group)
def createGroup():
    group_name = request.json["group_name"]
    participants = request.json["participants"]
    data = userService.createGroup(group_name,participants,request.user_id)
    return httpResponse(201,"Group Created!",data)

@bp.patch("/edit-profile")
@auth
def editProfile():
    data = request.get_json()
    userService.editProfile(data,request.user_id)
    return httpResponse(200,"Profile updated!")