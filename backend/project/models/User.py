from flask_login import UserMixin
from project import db

class User(UserMixin,db.Model):
    id = db.Column(db.Integer, primary_key=True) 
    user_type = db.Column(db.String(100))
    email = db.Column(db.String(100), unique=True)
    name = db.Column(db.String(100))
    password = db.Column(db.String(100))