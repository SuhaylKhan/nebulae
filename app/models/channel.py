from .db import db

class Channel(db.Model):
  __tablename__ = 'channels'

  id = db.Column(db.Integer, primary_key=True)
  server_id = db.Column(db.Integer, db.ForeignKey('servers.id'), nullable=False)
  name = db.Column(db.String(50), nullable=False)
  description = db.Column(db.String(2000))
  created_at = db.Column(db.DateTime, nullable=False)
  updated_at = db.Column(db.DateTime, nullable=False)

  server = db.relationship('Server', back_populates='channels')

  def to_dict(self):
    return {
      'id': self.id,
      'name': self.name,
      'description': self.description
    }
