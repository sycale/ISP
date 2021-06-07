from flask import request, jsonify, Blueprint
from flask_jwt_extended import create_access_token
from flask_jwt_extended import create_refresh_token
from flask_jwt_extended import jwt_required
from flask_jwt_extended import jwt_refresh_token_required
from flask_jwt_extended import get_jwt_identity

import json

from app import app, jwt, db, flask_bcrypt
from app.auth.models import Users
from app.place.models import Place
from app.rate.models import Rates
from app.rate.schemas import validate_rate, validate_update_rate

rate = Blueprint('rate', __name__)

@jwt.unauthorized_loader
def unauthorized_response(callback):
    return jsonify({ 'ok': False, 'message': 'Missing authorization header' }), 401

@app.route('/rate', methods=['POST'])
@jwt_required
def create_rate():
    validated_data = validate_rate(request.get_json())
    user_creds = get_jwt_identity()
    if validated_data['ok']:
        data = validated_data['data']
        new_rate = Rates(message=data['message'], food_rate=data['food_rate'], price_rate=data['price_rate'], service_rate=data['service_rate'], user_id=user_creds['id'], place_id=data['place_id'])
        db.session.add(new_rate)
        db.session.commit()
        return jsonify({'ok': True, "rate": new_rate.json()}), 200
    else:
        return jsonify({'ok': False, "message": "Invalid request params"}), 400

@app.route('/user_rates', methods=['GET'])
@jwt_required
def get_user_rates():
    user_creds_id = get_jwt_identity()[0]['id']

    rates_by_id = Rates.query.filter_by(user_id=user_creds_id).outerjoin(Users).order_by(Users.login.asc()).all()

    if rates_by_id:
        json_rates = list(map(lambda rate: rate.json(), rates_by_id))
        return jsonify({'ok': True, 'rates': json_rates}), 200
    else:
        return jsonify({'ok': False, 'message': 'Cant find user rates'}), 400
    
@app.route('/rates', methods=['GET'])
@jwt_required
def get_all_rates():
    all_rates = Rates.query.all()
    if all_rates:
        all_rates_json = list(map(lambda rate: rate.json(), all_rates))
        return jsonify({'ok': True, 'rates': all_rates_json}), 200
    else:
        return jsonify({'ok': False, 'message': "No rates"}), 400

@app.route('/place_rates/<place_id>', methods=['GET'])
@jwt_required
def get_place_rates(place_id):
    places_to_rate = Rates.query.filter_by(place_id=place_id).outerjoin(Place).order_by(Place.name.asc()).all()

    if places_to_rate:
        json_places = list(map(lambda place: place.json(), places_to_rate))
        return jsonify({'ok': True, 'places': json_places}), 200
    else:
        return jsonify({'ok': False, 'message': 'Cant find place rates'}), 400

@app.route('/place_rates/<rate_id>', methods=['PUT'])
@jwt_required
def update_rate(rate_id):
    data = validate_update_rate(request.get_json())

    if data['ok']:
        data = data['data']
        updated_rate = Rates.query.filter_by(id=rate_id).update({'value': data['value'], 'message': data['message']})
        db.session.commit()
        new_rate = Rates.query.filter_by(id=rate_id).first()
        if new_rate:
            return jsonify({'ok': True, 'rate': new_rate.json()})
        else:
            return jsonify({'ok': False, 'message': 'No rates to update'}), 400
    else:
        return jsonify({'ok': False, "message": "Invalid request params"}), 400