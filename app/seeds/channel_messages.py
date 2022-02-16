from app.models import db, ChannelMessage
from datetime import datetime, timezone

def seed_channel_messages():
  message1 = ChannelMessage(
    user_id=1, channel_id=1, content='This is a message', created_at=datetime(2022, 2, 14), updated_at=datetime.now(timezone.utc)
  )
  message2 = ChannelMessage(
    user_id=2, channel_id=1, content='Wow what a cool message', created_at=datetime(2022, 2, 14), updated_at=datetime.now(timezone.utc)
  )
  message3 = ChannelMessage(
    user_id=3, channel_id=2, content="Um I'm in a different channel...", created_at=datetime(2022, 2, 14), updated_at=datetime.now(timezone.utc)
  )

  db.session.add_all([
    message1, message2, message3
  ])
  db.session.commit()

def undo_channel_messages():
  db.session.execute('TRUNCATE channel_messages RESTART IDENTITY CASCADE;')
  db.session.commit()
