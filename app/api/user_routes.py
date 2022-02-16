from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/<int:id>/servers')
@login_required
def users_servers(id):
    user = User.query.get(id)
    admin_servers = user.admin_servers
    joined_servers = user.joined_servers
    users_servers = admin_servers + joined_servers
    return { 'servers': [server.to_dict() for server in users_servers] }
