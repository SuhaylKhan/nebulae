from flask import Blueprint, request
from datetime import datetime, timezone
from app.forms import NewChannelForm, EditChannelForm
from app.models import db, Channel

channel_routes = Blueprint('channel', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{error}')
    return errorMessages

@channel_routes.route('/new', methods=['POST'])
def create_channel():
  """
  Creates a new channel.
  """
  form = NewChannelForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    channel = Channel(
      server_id=form.data['server_id'],
      name=form.data['name'],
      description=form.data['description'],
      created_at=datetime.now(timezone.utc),
      updated_at=datetime.now(timezone.utc)
    )
    db.session.add(channel)
    db.session.commit()
    return channel.to_dict()
  return {'errors': validation_errors_to_error_messages(form.errors)}, 400

@channel_routes.route('/<int:channel_id>/edit', methods=['PUT'])
def edit_channel(channel_id):
  """
  Edits an existing channel.
  """
  data = request.json
  form = EditChannelForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    channel = Channel.query.get(channel_id)
    channel.name = data['name']
    channel.description = data['description']
    db.session.commit()
    return channel.to_dict()
  return {'errors': validation_errors_to_error_messages(form.errors)}, 400

@channel_routes.route('/<int:channel_id>/delete', methods=['DELETE'])
def delete_channel(channel_id):
  """
  Deletes an existing channel.
  """
  channel = Channel.query.get(channel_id)
  db.session.delete(channel)
  db.session.commit()
  return {}

@channel_routes.route('/<int:channel_id>/messages')
def channels_messages(channel_id):
  """
  Gets messages by channel id.
  """
  channel = Channel.query.get(channel_id)
  return {'messages': [message.to_dict() for message in channel.messages]}
