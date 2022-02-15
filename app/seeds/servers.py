from app.models import db, Server
from datetime import datetime

def seed_servers():
  server1 = Server(
    admin_id=1, name='Noisy Event', created_at=datetime(2022, 2, 14), updated_at=datetime.today()
  )
  server2 = Server(
    admin_id=1, name='Vigorous Mood', created_at=datetime(2022, 2, 14), updated_at=datetime.today()
  )
  server3 = Server(
    admin_id=2, name='Accurate Night', created_at=datetime(2022, 2, 14), updated_at=datetime.today()
  )

  db.session.add_all([
    server1, server2, server3
  ])
  db.session.commit()

def undo_servers():
  db.session.execute('TRUNCATE servers RESTART IDENTITY CASCADE;')
  db.session.commit()
