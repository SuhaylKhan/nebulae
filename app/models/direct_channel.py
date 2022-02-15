from .db import db
from .user_direct_channel import user_direct_channel

class DirectChannel(db.Model):
  __tablename__ = 'direct_channels'

  id = db.Column(db.Integer, primary_key=True)
  created_at = db.Column(db.DateTime, nullable=False)
  updated_at = db.Column(db.DateTime, nullable=False)

  members = db.relationship('User', secondary=user_direct_channel, back_populates='direct_channels')
  messages = db.relationship('DirectMessage', back_populates='direct_channel')

  def to_dict(self):
    return {
      'id': self.id
    }
