from .db import db

user_direct_channel = db.Table('users_direct_channels',
  db.Column('user_id', db.Integer, db.ForeignKey('users.id')),
  db.Column('direct_channel_id', db.Integer, db.ForeignKey('direct_channels.id'))
)
