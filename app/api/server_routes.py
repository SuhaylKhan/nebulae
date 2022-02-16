from flask import Blueprint, request
from datetime import datetime, timezone
from app.forms import NewServerForm, EditServerForm
from app.models import db, Server

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
