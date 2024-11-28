# backend/auth_routes.py
import os
from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, create_refresh_token, unset_jwt_cookies, set_refresh_cookies
import requests
from datetime import timedelta

auth = Blueprint('auth_bp', __name__)

"""
    The `login` function handles Google login authentication, retrieves user information, and generates
    a JWT token for authorization.
    :return: The code snippet defines a route for Google login authentication. When a POST request is
    made to "/google_login", it extracts the authorization code from the request JSON data. It then
    sends a POST request to Google's token endpoint with the code, client ID, client secret, redirect
    URI, and grant type to obtain an access token.
"""
@auth.route("/google_login", methods=["POST"])
def google_login():
    code = request.json['code']
    if code is None:
        return jsonify({"error": "googleResponse code is invalid"})
    
    client_id = os.getenv("GOOGLE_CLIENT_ID")
    client_secret = os.getenv("GOOGLE_CLIENT_SECRET")

    # preparing data to request for access token
    data = {    
        'code': code,
        'client_id': client_id,
        'client_secret': client_secret,
        'redirect_uri': 'postmessage',
        'grant_type': 'authorization_code',
    }

    # Getting the access token from google server
    headers_1 = {'Content-Type': 'application/x-www-form-urlencoded'}
    response = requests.post(
        'https://oauth2.googleapis.com/token',
        data=data,
        headers=headers_1
        ).json()

    headers_2 = {
        'Authorization': f'Bearer {response["access_token"]}'
    }

    # getting user info associated with the access token from google server
    user_info = requests.get('https://www.googleapis.com/oauth2/v3/userinfo', headers=headers_2).json()

    user_email = user_info.get("email")
    if user_email is None:
        return jsonify({"error": "Missing user email"})
    
    # """TODO: check if user exists in db, if not, add them"""
    # username = request.json("username", None)
    # password = request.json("password", None)

    # TODO: store user login in front-end localStorage
    identity = user_info['email']
    jwt_access_token = create_access_token(identity=identity) 
    jwt_refresh_token = create_refresh_token(identity=identity)
    response = jsonify(user=user_info, access_token=jwt_access_token)
    response.set_cookie('refresh_token_cookie', value=jwt_refresh_token, secure=True, httponly=True, max_age=timedelta(days=30))
    print(f"Refresh token set: {jwt_refresh_token}", flush=True)

    return response, 200


"""
    The `logout` function in the Python code logs out a user by deleting the "refresh_token" cookie and
    returning a JSON response indicating that the user is now logged out.
    :return: The `logout` function is returning a JSON response with a message indicating that the user
    is now logged out. Additionally, it deletes the "refresh_token" cookie before returning the
    response.
"""
@auth.route('/logout', methods=['POST'])
@jwt_required(optional=True)
def logout():
    response = jsonify({"message": "user is now logged out"})
    response.delete_cookie("refresh_token")
    unset_jwt_cookies(response)
    return response, 200


"""
    The function `refresh` in this Python code snippet retrieves a refresh token from a cookie,
    generates a new access token based on the identity associated with the refresh token, and returns
    the new access token in a JSON response.
    :return: If the refresh token is missing, the function will return a JSON response with the message
    "Missing refresh token" and a status code of 401 (Unauthorized). If there is an issue with the
    refresh token or creating a new access token, it will return a JSON response with the message
    "Invalid refresh token" and a status code of 401 (Unauthorized). If everything is successful, it
    will return
"""
@auth.route('/refresh', methods=['POST'])
@jwt_required(refresh=True, locations=['cookies'])
def refresh():
    try:
        identity = get_jwt_identity()
        new_access_token = create_access_token(identity=identity)
        new_refresh_token = create_refresh_token(identity=identity)
        response = jsonify({"access_token": new_access_token})
        response.set_cookie('refresh_token_cookie', value=new_refresh_token, secure=True, httponly=True, max_age=timedelta(days=30))
        return response, 200
    except Exception as e:
        print("invalid refresh token", flush=True)
        return jsonify({"msg": "Invalid refresh token"}), 401

# Protect a route with jwt_required, which will kick out requests
# without a valid JWT present.
@auth.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200

