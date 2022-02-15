from app.models import db, DirectMessage
from datetime import datetime

def seed_direct_messages():
  message1 = DirectMessage(
    user_id=1, direct_channel_id=1, content='Only we can see this message', created_at=datetime(2022, 2, 14), updated_at=datetime.today()
  )
  message2 = DirectMessage(
    user_id=2, direct_channel_id=1, content='This is so cool!', created_at=datetime(2022, 2, 14), updated_at=datetime.today()
  )

  db.session.add_all([
    message1, message2
  ])
  db.session.commit()

def undo_direct_messages():
  db.session.execute('TRUNCATE direct_messages RESTART IDENTITY CASCADE;')
  db.session.commit()
