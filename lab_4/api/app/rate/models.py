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
    message = db.Column(db.String(255), nullable=False)
    food_rate = db.Column(db.Integer, nullable=False)
    service_rate = db.Column(db.Integer, nullable=False)
    price_rate = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'))
    place_id = db.Column(db.Integer, db.ForeignKey('places.id', ondelete='CASCADE'))

    def __init__(self, message, food_rate, price_rate, service_rate, user_id, place_id):
        self.price_rate = price_rate
        self.food_rate = food_rate
        self.service_rate = service_rate
        self.message = message
        self.user_id = user_id
        self.place_id = place_id

    def json(self):
        return {
            "user": Users.query.filter_by(id=self.user_id).first().json(),
            "place": Place.query.filter_by(id=self.place_id).first().json(),
            "food": self.food_rate,
            "price": self.price_rate,
            "service": self.service_rate,
            "message": self.message,
            "id": self.id,
            "date_created": self.date_created
        }
