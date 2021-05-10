from app import db
from ..auth.models import Users

class Base(db.Model):
    __abstract__  = True
    id = db.Column(db.Integer, primary_key=True)
    date_created  = db.Column(db.DateTime, default=db.func.current_timestamp())

class Place(Base):
    __tablename__ = 'places'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
    description = db.Column(db.String(255), nullable=False)

    def __init__(self, name, owner_id, description):
        self.name = name
        self.owner_id = owner_id
        self.description = description

    def json(self):
        return {
            "name": self.name,
            "owner": Users.query.filter_by(id=self.owner_id).first().json(),
            "description": self.description,
            "id": self.id
        }