from flask import request, jsonify, Blueprint
from flask_jwt_extended import create_access_token
from flask_jwt_extended import create_refresh_token
from flask_jwt_extended import jwt_required
from flask_jwt_extended import jwt_refresh_token_required
from flask_jwt_extended import get_jwt_identity

import json

from app import app, jwt, db, flask_bcrypt
from app.place.schemas import validate_place
from app.rate.models import Rates
from app.place.models import Place

place = Blueprint('place', __name__)

@jwt.unauthorized_loader
def unauthorized_response(callback):
    return jsonify({ 'ok': False, 'message': 'Missing authorization header' }), 401

@app.route('/place', methods=['GET'])
@jwt_required
def get_all_places():
    places = Place.query.all()

    if places:
        places_json = list(map(lambda place: place.json(), places))
        return jsonify({'ok': True, 'places': places_json}), 200
    else:
        return jsonify({'ok': False, 'message': 'No places found'}), 400

@app.route('/place', methods=["POST"])
@jwt_required
def create_place():
    owner = get_jwt_identity()
    data = validate_place(request.get_json())
    if data['ok']:
        data = data['data']
        new_place = Place(name=data['name'], owner_id=owner['id'], description=data['description'])
        db.session.add(new_place)
        db.session.commit()
        return jsonify({'ok': True, "place": new_place.json()})
    else:
        return jsonify({'ok': False, "message": "Invalid request params"}), 400

@app.route('/place/<place_id>', methods=['GET'])
@jwt_required
def get_place(place_id):
    place_to_return = Place.query.filter_by(id=place_id).first()
    if place_to_return:
        return jsonify({"ok": True, 'place': place_to_return.json()})
    else:
        return jsonify({"ok": False, "message": "No places with such id"}), 400

@app.route('/place/<place_id>', methods=['DELETE'])
@jwt_required
def delete_place(place_id):
    place_to_delete = Place.query.filter_by(id=place_id).first()
    place_rates = Rates.query.filter_by(place_id=place_id).all()
    print(place_rates)
    if place_rates:
        for place_rate in place_rates:
            db.session.query(Rates).filter(Rates.place_id == place_id).delete()
    if place_to_delete:
        db.session.delete(place_to_delete)
        db.session.commit()
        return jsonify({'ok': True, "message": "Place has been deleted successfully"}), 200
    else:
        return jsonify({"ok": False, "message": "No places with such id"}), 400

@app.route('/user/places', methods=['GET'])
@jwt_required
def get_user_places():
    user_creds_id = get_jwt_identity()['id']
    user_places = Place.query.filter_by(owner_id=user_creds_id).all()
    if user_places:
        user_places_json = list(map(lambda _user_place: _user_place.json() ,user_places))
        return jsonify({'ok': True, 'user_places': user_places_json}), 200
    else:
        return jsonify({'ok': False, 'message': "Cannot find user places"}), 400

@app.route('/place/<place_id>', methods=['PUT'])
@jwt_required
def update_place(place_id):
    data = validate_place(request.get_json())
    if data['ok']:
        place = Place.query.filter_by(id=place_id).update({"description": data['description'], 'name': data['name']})
        db.session.commit()
        new_place = Place.query.filter_by(id=place_id).first()
        if new_place:
            return jsonify({'ok': True, 'place': place.json()})
        else:
            return jsonify({'ok': False, 'message': 'No places to update'}), 404
    else:
        return jsonify({'ok': False, "message": "Invalid request params"}), 400
