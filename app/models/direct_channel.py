from .db import db

class DirectChannel(db.Model):
  __tablename__ = 'direct_channels'

  id = db.Column(db.Integer, primary_key=True)
  created_at = db.Column(db.DateTime, nullable=False)
  updated_at = db.Column(db.DateTime, nullable=False)

  def to_dict(self):
    return {
      'id': self.id
    }
