from flask import request,Blueprint
from app.services import messageService
from app.utils.helper import httpResponse
from app.middlewares.authMiddleware import auth

bp = Blueprint("message",__name__,url_prefix="/api/message")

@bp.post("/get-all-message")
@auth
def getAllMessage():
    page = request.args.get("page")
    room_id = request.json["room_id"]
    data = messageService.getAllMessage(room_id,page)
    return httpResponse(200,"Success",data)