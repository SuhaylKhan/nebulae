from flask import Blueprint, request
from datetime import datetime, timezone
from app.forms import NewChannelForm
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
