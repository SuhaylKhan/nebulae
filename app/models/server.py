from .db import db

class Server(db.Model):
  __tablename__ = 'servers'

  id = db.Column(db.Integer, primary_key=True)
  admin_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  name = db.Column(db.String(50), nullable=False)
  created_at = db.Column(db.DateTime, nullable=False)
  updated_at = db.Column(db.DateTime, nullable=False)

  admin = db.relationship('User', back_populates='admin_servers')

  def to_dict(self):
    return {
      'id': self.id,
      'name': self.name
    }
