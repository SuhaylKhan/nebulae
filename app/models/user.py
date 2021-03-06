from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from .user_server import user_server
from .user_direct_channel import user_direct_channel

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    username = db.Column(db.String(25), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)

    admin_servers = db.relationship('Server', back_populates='admin')
    joined_servers = db.relationship('Server', secondary=user_server, back_populates='members')
    channel_messages = db.relationship('ChannelMessage', back_populates='user')
    direct_channels = db.relationship('DirectChannel', secondary=user_direct_channel, back_populates='members')
    direct_messages = db.relationship('DirectMessage', back_populates='user')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'servers': [server.to_dict() for server in self.admin_servers + self.joined_servers]
        }
