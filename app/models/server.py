from .db import db
from .user_server import user_server

class Server(db.Model):
  __tablename__ = 'servers'

  id = db.Column(db.Integer, primary_key=True)
  admin_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  name = db.Column(db.String(50), nullable=False)
  created_at = db.Column(db.DateTime, nullable=False)
  updated_at = db.Column(db.DateTime, nullable=False)

  admin = db.relationship('User', back_populates='admin_servers')
  members = db.relationship('User', secondary=user_server, back_populates='joined_servers')
  channels = db.relationship('Channel', back_populates='server', cascade='all, delete')

  def to_dict(self):
    return {
      'id': self.id,
      'admin_id': self.admin_id,
      'name': self.name,
      'channels': [channel.to_dict() for channel in self.channels]
    }
