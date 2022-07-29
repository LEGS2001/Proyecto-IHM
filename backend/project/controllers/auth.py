from flask import Blueprint, render_template, redirect, url_for, request, flash, jsonify, session, abort
from flask_login import login_user, logout_user, login_required, current_user
from werkzeug.security import generate_password_hash, check_password_hash
from ..models.User import User
from project import db 
import time, sqlite3, re
from flask_cors import CORS, cross_origin
from flask_session import Session

auth = Blueprint('auth', __name__)
CORS(auth, supports_credentials=True)

@auth.route('/@me')
def get_current_user():

    if "user_id" not in session: 
        return jsonify({"error": "Unauthorized"}), 401
    
    user_id = session["user_id"]
    user = User.query.filter_by(id=user_id).first()

    return jsonify({
        "id": user.id,
        "user_type": user.user_type,
        "email": user.email,
        "name": user.name
    })

@auth.route('/login')
def login():
    return render_template('login.html')


@auth.route('/ajax_login', methods=['POST'])
def ajax_login():
    _json = request.json
    responseMessage = {'message' : 'Log in successful'}
    responseStatusCode = 200
    remember = True if request.form.get('remember') else False

    time.sleep(2)

    email = _json['email']
    password = _json['password']

    user = User.query.filter_by(email=email).first()

    if not user or not check_password_hash(user.password, password):
       responseMessage = {'message':'Please check your login details and try again.'}
       responseStatusCode = 400 
    
    login_user(user, remember=remember) 

    session["user_id"] = user.id

    response = jsonify(responseMessage)
    response.status_code = responseStatusCode

    return(response) 



@auth.route('/signup')
def signup():
    return render_template('signup.html')

@auth.route('/ajax_signup', methods=['POST'])
def ajax_signup_post():
    _json = request.get_json()

    responseMessage = {'message' : 'The account has been created'}
    responseStatusCode = 200

    def invalid(responseMessage):
        responseStatusCode = 400
        response = jsonify(responseMessage)
        response.status_code = responseStatusCode
        return response

    time.sleep(2)
	
    email    = _json['email']
    name     = _json['name']
    user_type = _json['user_type']

    if re.search(" ", _json['password']): 
        responseMessage = {'message' : 'Password cannot contain spaces'}
        return invalid(responseMessage) 

    password = _json['password']

    user = User.query.filter_by(email=email).first()

    if user: 
        responseMessage = {'message' : 'Email address already exists'}
        responseStatusCode = 400
    else:
        
        while True:  
            if (len(password)<8):
                responseMessage = {'message' : 'Password must be more than 8 characters long'}
                return invalid(responseMessage)
            elif not re.search("[a-z]", password):
                responseMessage = {'message' : 'Password must contain at least one undercase letter'}
                return invalid(responseMessage)
            elif not re.search("[A-Z]", password):
                responseMessage = {'message' : 'Password must contain at least one uppercase letter'}
                return invalid(responseMessage)
            elif not re.search("[0-9]", password):
                responseMessage = {'message' : 'Password must contain at least one number'}
                return invalid(responseMessage)
            elif not re.search("[_@$#:.,*]", password):
                responseMessage = {'message' : 'Password must contain at least one special character'}
                return invalid(responseMessage)
            else:
                break

        new_user = User(email=email, name=name, password=generate_password_hash(password, method='sha256'), user_type=user_type)

        db.session.add(new_user)
        db.session.commit()
    
    response = jsonify(responseMessage)
    response.status_code = responseStatusCode

    return response

@auth.route('/react_logout', methods=["POST"])
def react_logout():
    session.pop("user_id", None)
    return "200"

@auth.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('main.index'))