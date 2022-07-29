from flask import Flask, session
from flask_login import LoginManager
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

from flask_session import Session

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)  

    app.config['SECRET_KEY'] = 'secret-key-goes-here'
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = 'false'

    db.init_app(app)

    from .controllers import controllers as controllers_blueprint
    app.register_blueprint(controllers_blueprint)

    from .models import models as models_blueprint
    app.register_blueprint(models_blueprint)
    
    from .controllers.auth import auth as auth_blueprint
    app.register_blueprint(auth_blueprint)

    from .controllers.main import main as main_blueprint
    app.register_blueprint(main_blueprint)

    from .controllers.admin import admin as admin_blueprint
    app.register_blueprint(admin_blueprint)

    from .controllers.teacher import teacher as teacher_blueprint
    app.register_blueprint(teacher_blueprint)

    from .controllers.student import student as student_blueprint
    app.register_blueprint(student_blueprint)
    

    login_manager = LoginManager()
    login_manager.login_view = 'auth.login'
    login_manager.init_app(app)

    from .models.User import User

    @login_manager.user_loader
    def load_user(user_id):
        return User.query.get(int(user_id))
    
    return app