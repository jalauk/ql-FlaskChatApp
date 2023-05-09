from app.models.message import Message
from app.models.chat import Chat
from app.exceptions.unprocessableEntityException import UnprocessableEntityException

def getAllMessage(room_id,page):
    skip_element = int(page) * 5
    chat = Chat.objects(room_id=room_id).first()
    if not chat:
        raise UnprocessableEntityException("Chat doesn't exists.")
    chat_id = chat.id
    print(chat_id)
    messages = Message.objects(chat_id = chat_id).only("text","sender","created_at","seen_by").exclude("id").order_by("-created_at").skip(skip_element).limit(5)
    message_list = []
    for message in messages:
        message_dict = {}
        message_dict["message"] = message.text
        message_dict["from"] = str(message.sender.id)
        message_dict["time"] = str(message.created_at)
        # message_dict["date"] = (message.created_at).strftime("%d/%m/%Y")
        message_dict["seen_by"] = message.seen_by
        message_list.append(message_dict)
    message_list.reverse()
    return message_list
