from flask import Blueprint, render_template, redirect, url_for, request, flash, jsonify, session, abort
from flask_login import login_user, logout_user, login_required, current_user
from ..models.User import User
from ..models.Course import Course
from ..models.Reading import Reading
from ..models.StudentList import StudentList
from project import db 
import sqlite3, time
student = Blueprint('student', __name__)

def invalid(responseMessage):
        responseStatusCode = 400
        response = jsonify(responseMessage)
        response.status_code = responseStatusCode
        return response

@student.route('/student')
@login_required
def student_crud():
    return render_template('student/student.html', user_name=current_user.name)
    

@student.route('/student', methods=['POST'])
@login_required
def ajax_student_post():
    _json = request.json
    responseMessage = {'message' : 'Joined Course'}
    responseStatusCode = 200
    
    time.sleep(1)

    key = _json['key']
    
    course = Course.query.filter_by(entry_key=key).first()
    if request.method == 'POST':
        if course:
            if not course:
                responseMessage = {'message' : 'Course doesnt exist'}
                return invalid(responseMessage)
            if StudentList.query.filter_by(id_course=course.id, id_student=current_user.id).first():
                responseMessage = {'message' : 'Already signed up for this course'}
                return invalid(responseMessage)
    
            new_list = StudentList(id_student=current_user.id,name_student = current_user.name, id_course = course.id)

            db.session.add(new_list)
            db.session.commit()
 
            response = jsonify(responseMessage)
            response.status_code = responseStatusCode
            return response 
        responseMessage = {'message' : 'Key Does Not Exist'}
        return invalid(responseMessage)

    responseMessage = {'message' : 'Error'}
    return invalid(responseMessage)
    




