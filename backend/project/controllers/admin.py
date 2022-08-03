from flask import Blueprint, render_template, redirect, url_for, request, flash, jsonify, session, abort
from flask_login import login_user, logout_user, login_required, current_user
from werkzeug.security import generate_password_hash, check_password_hash
from ..models.User import User
from ..models.Course import Course
from ..models.Reading import Reading
from ..models.StudentList import StudentList
from project import db 
from flask_cors import CORS, cross_origin
import sqlite3, random, string
admin = Blueprint('admin', __name__)

CORS(admin, supports_credentials=True)

@admin.route('/admin', methods=['GET'])
@login_required
def admin_crud():
    c = sqlite3.connect('project/db.sqlite')
    cur = c.cursor()
    cur.execute("SELECT * from User")
    table_user = cur.fetchall()
    cur.execute("SELECT * from Course")
    table_course = cur.fetchall()
    cur.execute("SELECT * from Reading")
    table_reading = cur.fetchall()
    cur.execute(f"SELECT * from Student_List")
    table_student = cur.fetchall()
    return jsonify(table_user)
    #return render_template('admin/admin.html', table_user = table_user, table_course=table_course, table_reading=table_reading, table_student=table_student, user_name=current_user.name)

###################################################################################################
#                                Admin-User                                                       #
###################################################################################################

@admin.route('/admin-update-user')
@login_required
def admin_update_user():
    return render_template('admin/admin-update-user.html', user_name=current_user.name)

@admin.route('/admin-update-user-getid', methods=['POST'])
@login_required
def admin_update_user_post_getid():
    userid = request.form.get('userid')
    return render_template('admin/admin-update-user.html', userid=userid, user_name=current_user.name)

@admin.route('/admin-update-user', methods=['POST'])
@login_required
def admin_update_user_post():
    userid = request.form.get('userid')
    name = request.form['name']
    email = request.form['email']
    password = request.form['password']
    user = User.query.filter_by(id=userid).first()
    #########################################################################################
    if user.user_type == "Student":
        studentlist = StudentList.query.filter_by(id_student=userid)
        for student in studentlist:
            db.session.delete(student)
            db.session.commit()
            student = StudentList(id=student.id, id_student=student.id_student, name_student=name, id_course=student.id_course)
            db.session.add(student)
            db.session.commit() 
    if user.user_type == "Teacher":
        course = Course.query.filter_by(id_teacher=userid)
        for teacher in course:
            db.session.delete(teacher)
            db.session.commit() 
            teacher = Course(id=teacher.id, name=teacher.name, entry_key=teacher.entry_key, id_teacher=teacher.id_teacher, name_teacher=name)
            db.session.add(teacher)
            db.session.commit() 
            

    if request.method == 'POST':
        if user:
            db.session.delete(user)
            db.session.commit()
 
            user = User(id=userid, user_type=user.user_type, name=name, email=email, password = generate_password_hash(password, method='sha256'))
 
            db.session.add(user)
            db.session.commit()
            return redirect('/admin')
        return "ID does not exist"
 
    return render_template('admin/admin-update-user.html', user_name=current_user.name)

@admin.route('/admin-delete-user', methods=['POST'])
@login_required
def admin_delete_user_post():
    userid = request.form.get('userid')
    user = User.query.filter_by(id=userid).first()

    if user.user_type == "Student":
        studentlist = StudentList.query.filter_by(id_student=userid)
        for student in studentlist:
            db.session.delete(student)
            db.session.commit()
    if user.user_type == "Teacher":
        course = Course.query.filter_by(id_teacher=userid)
        for teacher in course:
            studentlist = StudentList.query.filter_by(id_course=teacher.id)
            for list in studentlist:
                db.session.delete(list)
                db.session.commit() 
            db.session.delete(teacher)
            db.session.commit() 
        reading = Reading.query.filter_by(id_teacher=userid)
        for teacher in reading:
            db.session.delete(teacher)
            db.session.commit()

    if request.method == 'POST':
        if user:
            db.session.delete(user)
            db.session.commit()
            return redirect('/admin')
        abort(404)
 
    return render_template('admin/admin.html')

###################################################################################################
#                                Admin-Course                                                     #
###################################################################################################

@admin.route('/admin-update-course')
@login_required
def admin_update_course():
    return render_template('admin/admin-update-course.html', user_name=current_user.name)

@admin.route('/admin-update-course-getid', methods=['POST'])
@login_required
def admin_update_course_post_getid():
    courseid = request.form.get('courseid')
    return render_template('admin/admin-update-course.html', courseid=courseid, user_name=current_user.name)

@admin.route('/admin-update-course', methods=['POST'])
@login_required
def admin_update_course_post():
    courseid = request.form.get('courseid')
    name = request.form.get('name')

    characters = string.ascii_letters + string.digits + string.punctuation
    randomkey = ''.join(random.choice(characters) for i in range(16))

    teacherid = request.form.get('teacherid')

    course = Course.query.filter_by(id=courseid).first()
    user = User.query.filter_by(id=teacherid).first()
    if request.method == 'POST':
        if course:
            if Course.query.filter_by(entry_key=randomkey).first():
                return "Entry Key can't be the same as another course"

            db.session.delete(course)
            db.session.commit()
 
            course = Course(id=courseid, name=name, entry_key=randomkey, id_teacher=teacherid, name_teacher = user.name)
 
            db.session.add(course)
            db.session.commit()
            return redirect('/admin')
        return "ID does not exist"
 
    return redirect(url_for('admin/admin-update-course.html'))

@admin.route('/admin-delete-course', methods=['POST'])
@login_required
def admin_delete_course_post():
    courseid = request.form.get('courseid')
    course = Course.query.filter_by(id=courseid).first()

    studentlist = StudentList.query.filter_by(id_course=course.id)
    for list in studentlist:
        db.session.delete(list)
        db.session.commit() 

    if request.method == 'POST':
        if course:
            db.session.delete(course)
            db.session.commit()
            return redirect('/admin')
        abort(404)
 
    return render_template('admin/admin.html')

###################################################################################################
#                                Admin-Reading                                                    #
###################################################################################################

@admin.route('/admin-update-reading')
@login_required
def admin_update_reading():
    return render_template('admin/admin-update-reading.html', user_name=current_user.name)

@admin.route('/admin-update-reading-getid', methods=['POST'])
@login_required
def admin_update_reading_post_getid():
    readingid = request.form.get('readingid')
    return render_template('admin/admin-update-reading.html', readingid=readingid, user_name=current_user.name)

@admin.route('/admin-update-reading', methods=['POST'])
@login_required
def admin_update_reading_post():
    name = request.form.get('name')
    text = request.form.get('text')
    teacherid = request.form.get('teacherid')
    readingid = request.form.get('readingid')
    reading = Reading.query.filter_by(id=readingid).first()
    if request.method == 'POST':
        if reading:
            db.session.delete(reading)
            db.session.commit()
 
            reading = Reading(id=readingid, name=name, text=text, id_teacher=teacherid)
 
            db.session.add(reading)
            db.session.commit()
            return redirect('/admin')
        return "ID does not exist"
 
    return redirect(url_for('admin/admin-update-reading.html'))

@admin.route('/admin-delete-reading', methods=['POST'])
@login_required
def admin_delete_reading_post():
    readingid = request.form.get('readingid')
    reading = Reading.query.filter_by(id=readingid).first()
    if request.method == 'POST':
        if reading:
            db.session.delete(reading)
            db.session.commit()
            return redirect('/admin')
        abort(404)
 
    return render_template('admin/admin.html')