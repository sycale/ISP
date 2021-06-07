from flask import request, jsonify, Blueprint
from flask_jwt_extended import create_access_token
from flask_jwt_extended import create_refresh_token
from flask_jwt_extended import jwt_required
from flask_jwt_extended import jwt_refresh_token_required
from flask_jwt_extended import get_jwt_identity

from sqlalchemy import or_

from app import app, jwt, db, flask_bcrypt
from app.auth.models import Users
from app.auth.schemas import validate_user, validate_user_login

auth = Blueprint('auth', __name__)

@app.route('/', methods=['GET'])
def index():
    return jsonify({'ok': True, 'message': 'pong'}), 401


@jwt.unauthorized_loader
def unauthorized_response(callback):
    return jsonify({ 'ok': False, 'message': 'Missing authorization header' }), 401


@app.route('/auth', methods=['POST'])
def auth_user():
    data = validate_user_login(request.get_json())
    if data['ok']:
        data = data['data']
        user = None
        user = Users.query.filter_by(login=data['login']).first()
        if user and flask_bcrypt.check_password_hash(user.password, data['password']):
            del user.password
            access_token = create_access_token(identity=user.json())
            refresh_token = create_refresh_token(identity=user.json()) # Why it set
            return jsonify({'ok': True, 'access_token': access_token, 'refresh_token': refresh_token, 'user': user.json()}), 200
        else:
            return jsonify({'ok': False, 'message': 'Invalid credentials'}), 401
    else:
        return jsonify({'ok': False, 'message': 'Bad request parameters: {}'.format(data['message'])}), 400


@app.route('/register', methods=['POST'])
def register():
    data = validate_user(request.get_json())
    if data['ok']:
        data = data['data']
        data['password'] = flask_bcrypt.generate_password_hash(data['password']).decode('utf-8')
        user = Users(login=data['login'], email=data['email'], password=data['password'], role=data['role'])
        db.session.add(user)
        db.session.commit()
        access_token = create_access_token(identity=user.json())
        refresh_token = create_refresh_token(identity=user.json()) # Why it set
        return jsonify({'ok': True, 'access_token': access_token, 'refresh_token': refresh_token, 'user': user.json()}), 200
    else:
        return jsonify({'ok': False, 'message': 'Bad request parameters: {}'.format(data['message'])}), 400

@app.route('/user', methods=['GET'])
@jwt_required
def get_user_info():
    data = get_jwt_identity()
    return jsonify(data)

@app.route('/user', methods=['DELETE'])
@jwt_required
def delete_user(user_id):
    creadentials = get_jwt_identity()
    user_to_delete = Users.query.filter_by(id=credentials[0]['id']).first()
    if user_to_delete:
        db.session.delete(user_to_delete)
        db.session.commit()
        return jsonify({'ok': True, 'message': 'User has been successfully deleted'}), 200
    else:
        return jsonify({'ok': False, 'message': 'User doesnt exist, try again with appropriate id'}), 400

@app.route('/refresh', methods=['POST'])
@jwt_refresh_token_required
def refresh():
    current_user = get_jwt_identity()
    ret = { 'token': create_access_token(identity=current_user) }
    return jsonify({'ok': True, 'data': ret}), 200