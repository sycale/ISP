from app import db
from ..auth.models import Users
from ..place.models import Place

class Base(db.Model):
    __abstract__  = True
    id = db.Column(db.Integer, primary_key=True)
    date_created  = db.Column(db.DateTime, default=db.func.current_timestamp())


class Rates(Base):
    __tablename__ = 'rates'

    id = db.Column(db.Integer, primary_key=True)
    value = db.Column(db.Integer, nullable=False)
    message = db.Column(db.String(255), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'))
    place_id = db.Column(db.Integer, db.ForeignKey('places.id', ondelete='CASCADE'))

    def __init__(self, message, value, user_id, place_id):
        self.value = value
        self.message = message
        self.user_id = user_id
        self.place_id = place_id

    def json(self):
        return {
            "user": Users.query.filter_by(id=self.user_id).first().json(),
            "place": Place.query.filter_by(id=self.place_id).first().json(),
            "value": self.value,
            "message": self.message,
            "id": self.id
        }
