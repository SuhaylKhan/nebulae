from app.models import db, DirectChannel
from datetime import datetime

def seed_direct_channels():
  channel1 = DirectChannel(
    created_at=datetime(2022, 2, 14), updated_at=datetime.today()
  )

  db.session.add_all([
    channel1
  ])
  db.session.commit()

def undo_direct_channels():
  db.session.execute('TRUNCATE direct_channels RESTART IDENTITY CASCADE;')
  db.session.commit()
