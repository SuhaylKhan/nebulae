from flask.cli import AppGroup
from .users import seed_users, undo_users
from .servers import seed_servers, undo_servers
from .channels import seed_channels, undo_channels
from .channel_messages import seed_channel_messages, undo_channel_messages
from .direct_channels import seed_direct_channels, undo_direct_channels
from .direct_messages import seed_direct_messages, undo_direct_messages

seed_commands = AppGroup('seed')

@seed_commands.command('all')
def seed():
    seed_users()
    seed_servers()
    seed_channels()
    seed_channel_messages()
    seed_direct_channels()
    seed_direct_messages()

@seed_commands.command('undo')
def undo():
    undo_users()
    undo_servers()
    undo_channels()
    undo_channel_messages()
    undo_direct_channels()
    undo_direct_messages()
