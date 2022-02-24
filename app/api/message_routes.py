from flask import Blueprint, request
from datetime import datetime, timezone
from app.models import db, ChannelMessage

message_routes = Blueprint('message', __name__)

@message_routes.route('/new', methods=['POST'])
def new_message():
  """
  Create a new message.
  """
  data = request.json
  message = ChannelMessage(
    user_id=data['user_id'],
    content=data['content'],
    channel_id=data['channel_id'],
    created_at=datetime.now(timezone.utc),
    updated_at=datetime.now(timezone.utc)
  )
  db.session.add(message)
  db.session.commit()
  return message.to_dict()

@message_routes.route('/<int:id>/delete', methods=['DELETE'])
def delete_message(id):
  """
  Deletes a message.
  """
  message = ChannelMessage.query.get(id)
  db.session.delete(message)
  db.session.commit()
  return {}

@message_routes.route('/<int:id>/edit', methods=['PUT'])
def edit_message(id):
  """
  Updates a message.
  """
  data = request.json
  message = ChannelMessage.query.get(id)
  message.content = data['content']
  db.session.commit()
  return message.to_dict()
