from .db import db

user_server = db.Table('users_servers',
  db.Column('user_id', db.Integer, db.ForeignKey('users.id')),
  db.Column('server_id', db.Integer, db.ForeignKey('servers.id'))
)
