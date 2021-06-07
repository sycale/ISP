import os, datetime

DEBUG = False
ENV = 'development'
BASE_DIR = os.path.abspath(os.path.dirname(__file__))
SQLALCHEMY_DATABASE_URI = 'postgresql://localhost/carstore'
SQLALCHEMY_TRACK_MODIFICATIONS = False
THREADS_PER_PAGE = 2
CSRF_ENABLED = True
CSRF_SESSION_KEY = "your key"
SECRET_KEY = "your key"
JWT_SECRET_KEY = 'your key'
JWT_ACCESS_TOKEN_EXPIRES = datetime.timedelta(days=5)
SQLALCHEMY_POOL_SIZE=10
