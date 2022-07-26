from flask_login import UserMixin
from project import db

class Reading(UserMixin,db.Model):
    id = db.Column(db.Integer, primary_key=True) 
    name = db.Column(db.String(100))
    id_teacher = db.Column(db.Integer)
    #Temporal, cambiar text por FILE (epub) y Audio (mp3)
    text = db.Column(db.String(5000))