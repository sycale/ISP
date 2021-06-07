from app import db

class Base(db.Model):
    __abstract__  = True
    id = db.Column(db.Integer, primary_key=True)
    date_created  = db.Column(db.DateTime, default=db.func.current_timestamp())

class Users(Base):
    id = db.Column(db.Integer, primary_key=True)
    login = db.Column(db.String(255), unique=True, nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    password = db.Column(db.String(255), unique=False, nullable=False)
    role = db.Column(db.String(255), nullable=False)

    def __init__(self, login, password, email, role):
        self.login = login
        self.password = password
        self.email = email
        self.role = role

    def json(self):
        return {
            "id": self.id,
            "username": self.login,
            "email": self.email,
            "role": self.role
        }