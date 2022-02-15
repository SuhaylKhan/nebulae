from .db import db

class DirectMessage(db.Model):
  __tablename__ = 'direct_messages'

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  direct_channel_id = db.Column(db.Integer, db.ForeignKey('direct_channels.id'), nullable=False)
  content = db.Column(db.String(2000), nullable=False)
  created_at = db.Column(db.DateTime, nullable=False)
  updated_at = db.Column(db.DateTime, nullable=False)

  user = db.relationship('User', back_populates='direct_messages')
  direct_channel = db.relationship('DirectChannel', back_populates='messages')

  def to_dict(self):
    return {
      'id': self.id,
      'content': self.content
    }
