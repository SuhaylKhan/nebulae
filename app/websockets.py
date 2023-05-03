from flask_socketio import SocketIO, emit
import os

if os.environ.get("FLASK_ENV") == "production":
    origins = [
        "http://nebulae.herokuapp.com",
        "https://nebulae.herokuapp.com"
    ]
else:
    origins = "*"

socketio = SocketIO(cors_allowed_origins=origins)

@socketio.on("chat")
def handle_chat(data):
  emit("chat", data, broadcast=True)

@socketio.on("edit")
def handle_edit(data):
    emit("edit", data, broadcast=True)

@socketio.on("delete")
def handle_delete(data):
    emit("delete", data, broadcast=True)

@socketio.on("deleteChannel")
def handle_delete_channel(data):
    emit("deleteChannel", data, broadcast=True)

@socketio.on("deleteServer")
def handle_delete_server(data):
    emit("deleteServer", data, broadcast=True)
