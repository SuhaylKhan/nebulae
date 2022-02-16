from app.models import db, Channel
from datetime import datetime, timezone

def seed_channels():
  channel1 = Channel(
    server_id=1, name='Please', description='This is an optional description', created_at=datetime(2022, 2, 14), updated_at=datetime.now(timezone.utc)
  )
  channel2 = Channel(
    server_id=1, name='Note', created_at=datetime(2022, 2, 14), updated_at=datetime.now(timezone.utc)
  )
  channel3 = Channel(
    server_id=1, name='Demonstrator', description='This description is also optional', created_at=datetime(2022, 2, 14), updated_at=datetime.now(timezone.utc)
  )
  channel4 = Channel(
    server_id=2, name='Feast', created_at=datetime(2022, 2, 14), updated_at=datetime.now(timezone.utc)
  )
  channel5 = Channel(
    server_id=2, name='Rate', description='Some of these seeds do not have description because descriptions are optional', created_at=datetime(2022, 2, 14), updated_at=datetime.now(timezone.utc)
  )
  channel6 = Channel(
    server_id=3, name='Needle', created_at=datetime(2022, 2, 14), updated_at=datetime.now(timezone.utc)
  )

  db.session.add_all([
    channel1, channel2, channel3, channel4, channel5, channel6
  ])
  db.session.commit()

def undo_channels():
  db.session.execute('TRUNCATE channels RESTART IDENTITY CASCADE;')
  db.session.commit()
