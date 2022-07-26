from flask import Blueprint, render_template
from flask_login import login_required, current_user
from werkzeug.security import generate_password_hash
from ..models.User import User
from project import db 

main = Blueprint('main', __name__)

@main.route('/')
def index():
    admin = User.query.filter_by(user_type='Admin').first()
    if not admin:
        admin = User(email='admin@email.com', name='admin', password=generate_password_hash('AuT0_G3n3R4D0', method='sha256'), user_type='Admin')
        db.session.add(admin)
        db.session.commit()
    return render_template('index.html')

@main.route('/profile')
@login_required
def profile():
    return render_template('profile.html', user_name=current_user.name)