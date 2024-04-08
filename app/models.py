# Add any model classes for Flask-SQLAlchemy here
from datetime import datetime, timezone
from . import db
class Movie(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=False)
    poster = db.Column(db.String(255), nullable=True)  # Assuming the poster is optional
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
