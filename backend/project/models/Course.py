from flask_login import UserMixin
from project import db

class Course(UserMixin,db.Model):
    id = db.Column(db.Integer, primary_key=True) 
    name = db.Column(db.String(100))
    entry_key = db.Column(db.String(100))
    id_teacher = db.Column(db.Integer)
    name_teacher = db.Column(db.String(100))
    
    #Falta implementar id collection, id grades, id reading, id quiz