import os
from uuid import uuid4
from app.models import db
import app.config as config
from flask_cors import CORS
from datetime import datetime
from flask import Flask,request
from app.models.chat import Chat
from app.models.user import User
from app.models import ONLINE_USER
from app.models.message import Message
from app.utils.helper import httpResponse
from app.Controllers import userController
from app.Controllers import messageController
from flask_socketio import SocketIO,join_room,leave_room
from app.exceptions.badRequestException import BadRequestException
from app.exceptions.accessDeniedException import AccessDeniedException
from app.exceptions.unauthorizedException import UnauthorizedException
from app.exceptions.unprocessableEntityException import UnprocessableEntityException

app = Flask(__name__)
CORS(app, support_credentials=True)

if os.environ.get("APP_ENV") == "dev":
    app.config.from_object(config.DevelopmentConfig)
elif os.environ.get("APP_ENV") == "prod":
    app.config.from_object(config.ProductionConfig)

db.__init__(app)

app.register_blueprint(userController.bp)
app.register_blueprint(messageController.bp)

@app.errorhandler(404)
def err_404(e):
    return httpResponse(404,"Page Not Found!")

@app.errorhandler(405)
def err_405(e):
    return httpResponse(405,"Method Not Allowed!")

@app.errorhandler(UnauthorizedException)
def err_401(e):
    return httpResponse(401,"Unauthorized",e.errors)

@app.errorhandler(AccessDeniedException)
def err_403(e):
    return httpResponse(403,"Access Denied",e.errors)

@app.errorhandler(BadRequestException)
def err_400(e):
    return httpResponse(400,"Bad Request",e.errors)

@app.errorhandler(UnprocessableEntityException)
def err_422(e):
    return httpResponse(422,"Unprocessable Entity",e.errors)

@app.errorhandler(Exception)
def err_500(e):
    print(e)
    return httpResponse(500,"Server Error.")

socketio = SocketIO(app,cors_allowed_origins="*")

@socketio.on("connect")
def connect(data):
    print("connect sid : ",request.sid)

@socketio.on("add-user")
def addUser(user_id):
    ONLINE_USER[user_id] = {"sid" : request.sid,"room_id":None}
    socketio.emit("user-online",user_id)

    # r.set(user_id,request.sid)
    
@socketio.on("create-room")
def createRoom(data):
    try:
        room_id = str(uuid4())
        participants = []
        participants.append(data["user_id"])
        participants.append(data["friend_id"])
        chat = Chat(room_id=room_id,participants=participants)
        chat.save()
        join_room(room_id)
        ONLINE_USER[data["user_id"]]["room_id"] = room_id
        print("\n\n\n\ncreate room online user : \n\n\n\n\n\n\n",ONLINE_USER)
    except Exception as e:
        print(e)
    return room_id

@socketio.on("join-room")
def joinRoom(data):
    ONLINE_USER[data["from"]]["room_id"] = data["room_id"] 
    join_room(data["room_id"])
    chat_id = Chat.objects(room_id=data["room_id"]).first().id
    try:
        message_obj = Message.objects(chat_id=chat_id,sender__ne=data["from"]).update(set__seen_by=[data["from"]])
        socketio.emit("message-seen",{"room_id":data["room_id"]},to=data["room_id"],include_self=False)
        print("\n\n\n\nonline user : \n\n\n\n\n\n\n",ONLINE_USER)
    except Exception as e:
        print(e)
    return ONLINE_USER

@socketio.on("send-message")
def sendMessage(data):
    print("\n\n\n\n\n\nsent data : \n\n\n\n",data)
    chat_id = Chat.objects(room_id=data["room_id"]).first().id
    try:
        if (data["to"] in ONLINE_USER.keys()):
            if (ONLINE_USER[data["to"]]["room_id"] == data["room_id"]):
                seen_by=data["to"]
                message_obj = Message(chat_id=str(chat_id),sender=data["from"],text=data["message"],created_at=datetime.now(),seen_by=[data["to"]])
            else:
                messages = Message.objects(chat_id=str(chat_id))
                unread_count = 0
                if messages:
                    unread_count = len(messages.filter(sender__ne=data["to"],seen_by__size=0))
                socketio.emit("unread-count",{"message": data["message"],"unread_count" : unread_count+1,"room_id":data["room_id"],"time":str(datetime.now())},to=ONLINE_USER[data["to"]]["sid"])
                seen_by=[]
                message_obj = Message(chat_id=str(chat_id),sender=data["from"],text=data["message"],created_at=datetime.now(),seen_by=[])
        else:
            seen_by=[]
            print("other user is not online")
            message_obj = Message(chat_id=str(chat_id),sender=data["from"],text=data["message"],created_at=datetime.now(),seen_by=[])
            
        message_obj.save()
        
        socketio.emit("receive-message",{"message" : data["message"],"from" : data["from"],"time":str(datetime.now()),"seen_by":seen_by,"room_id":data["room_id"]},to=data["room_id"])
    except Exception as e:
        raise e
    return data

@socketio.on("is-typing")
def isTyping(data):
    socketio.emit("typing",data,to=data["room_id"])

@socketio.on("get-room-detail")
def getRoomDetail(data):
    current_chat = {}
    chat = Chat.objects(room_id=data["room_id"]).first()
    for participant in chat.participants:
        if data["user_id"] != str(participant.id):
            messages = Message.objects(chat_id=chat.id)
            last_message = None
            unread_count = 0
            if messages:
                last_message = messages.order_by("-created_at").first()
                unread_count = len(messages.filter(sender__ne=data["user_id"],seen_by__size=0))
            
            current_chat["message"] = last_message.text if last_message else None
            current_chat["_id"] = {"$oid" : str(participant.id)}
            current_chat["username"] = participant.username
            current_chat["profile"] = participant.profile
            current_chat["message_time"] = str(last_message.created_at) if last_message else None
            current_chat["online"] = True if str(participant.id) in ONLINE_USER else False
            current_chat["is_group"] = False
            current_chat["unread_count"] = unread_count
    
    return current_chat


@socketio.on("leave-room")
def leaveRoom(data):
    leave_room(data["room_id"])
    ONLINE_USER[data["user_id"]]["room_id"] = None
    # return ONLINE_USER

@socketio.on("disconnect")
def disconnectEvent():
    # print("working")
    print(request.sid)
    # socketio.emit("testing-dis","someone disconnected")
    user_id = None
    for key, value in ONLINE_USER.items():
        if request.sid == value["sid"]:
            user_id = key

    if user_id != None:
        del ONLINE_USER[user_id]

    socketio.emit("user-offline",user_id)

    try:
        User.objects(id=user_id).update_one(set__last_online=datetime.now())
    except Exception as e:
        print(e)

if __name__ == "__main__":
    socketio.run(app)
