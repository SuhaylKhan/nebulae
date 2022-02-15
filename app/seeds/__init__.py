from flask.cli import AppGroup
from .users import seed_users, undo_users
from .servers import seed_servers, undo_servers
from .channels import seed_channels, undo_channels

seed_commands = AppGroup('seed')

@seed_commands.command('all')
def seed():
    seed_users()
    seed_servers()
    seed_channels()

@seed_commands.command('undo')
def undo():
    undo_users()
    undo_servers()
    undo_channels()
