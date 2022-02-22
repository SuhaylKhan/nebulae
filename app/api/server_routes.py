from flask import Blueprint, request
from datetime import datetime, timezone
from app.forms import NewServerForm, EditServerForm, JoinServerForm
from app.models import db, Server, User

server_routes = Blueprint('server', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{error}')
    return errorMessages

@server_routes.route('/new', methods=['POST'])
def create_server():
  """
  Creates a new server.
  """
  form = NewServerForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    server = Server(
      admin_id=form.data['admin_id'],
      name=form.data['name'],
      created_at=datetime.now(timezone.utc),
      updated_at=datetime.now(timezone.utc)
    )
    db.session.add(server)
    db.session.commit()
    return server.to_dict()
  return {'errors': validation_errors_to_error_messages(form.errors)}, 400

@server_routes.route('/<int:server_id>/edit', methods=['PUT'])
def edit_server(server_id):
  """
  Edits an existing server.
  """
  data = request.json
  form = EditServerForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    server = Server.query.get(server_id)
    server.name = data['name']
    db.session.commit()
    return server.to_dict()
  return {'errors': validation_errors_to_error_messages(form.errors)}, 400

@server_routes.route('/<int:server_id>/delete', methods=['DELETE'])
def delete_server(server_id):
  """
  Deletes an existing server.
  """
  server = Server.query.get(server_id)
  db.session.delete(server)
  db.session.commit()
  return {}

@server_routes.route('/<int:server_id>/channels')
def servers_channels(server_id):
  """
  Gets channels by server_id
  """
  server = Server.query.get(server_id)
  return {'channels': [channel.to_dict() for channel in server.channels]}

@server_routes.route('/<int:server_id>/join', methods=['POST'])
def join_server(server_id):
  """
  Adds user to a server
  """
  form = JoinServerForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  user = User.query.get(form.data['user_id'])
  server = Server.query.get(form.data['server_id'])

  if form.validate_on_submit():
    if server and (server.name == form.data['server_name']):
      server.members.append(user)
      return server.to_dict()
    else:
      return {'errors': ['Link is invalid']}, 400
  return {'errors': validation_errors_to_error_messages(form.errors)}, 400
