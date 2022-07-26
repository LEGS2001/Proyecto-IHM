from flask_login import UserMixin
from project import db

class StudentList(UserMixin,db.Model):
    id = db.Column(db.Integer, primary_key=True) 
    id_student = db.Column(db.Integer)
    name_student = db.Column(db.String(100))
    id_course = db.Column(db.Integer)