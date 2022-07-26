from flask import Blueprint, render_template, redirect, url_for, request, flash, jsonify, session, abort
from flask_login import login_user, logout_user, login_required, current_user
from ..models.User import User
from ..models.Course import Course
from ..models.Reading import Reading
from ..models.StudentList import StudentList
from project import db 
import sqlite3, random, string
teacher = Blueprint('teacher', __name__)


@teacher.route('/teacher')
@login_required
def teacher_crud():
    c = sqlite3.connect('project/db.sqlite')
    cur = c.cursor()
    cur.execute(f"SELECT * from Course WHERE id_teacher = {current_user.id}")
    table_course = cur.fetchall()
    cur.execute(f"SELECT * from Reading WHERE id_teacher = {current_user.id}")
    table_reading = cur.fetchall()
    cur.execute(f"SELECT * from Student_List")
    table_student = cur.fetchall()
    return render_template('teacher/teacher.html', table_course = table_course, table_reading = table_reading, table_student = table_student, user_name=current_user.name)

###################################################################################################
#                                Teacher-Course                                                   #
###################################################################################################

@teacher.route('/teacher-create-course')
@login_required
def teacher_create_course():
    return render_template('teacher/teacher-create-course.html', user_name=current_user.name)

@teacher.route('/teacher-create-course', methods=['POST'])
@login_required
def teacher_create_course_post():
    name = request.form.get('name')

    characters = string.ascii_letters + string.digits + string.punctuation
    randomkey = ''.join(random.choice(characters) for i in range(16))

    if request.method == 'POST':

        if Course.query.filter_by(entry_key=randomkey).first():
            return "Entry Key can't be the same as another course"

        new_course = Course(name=name, entry_key=randomkey, id_teacher=current_user.id, name_teacher=current_user.name)

        db.session.add(new_course)
        db.session.commit()
        return redirect('/teacher')
 
    return render_template('teacher/teacher-create-course.html', user_name=current_user.name)

@teacher.route('/teacher-update-course')
@login_required
def teacher_update_course():
    return render_template('teacher/teacher-update-course.html', user_name=current_user.name)

@teacher.route('/teacher-update-course-getid', methods=['POST'])
@login_required
def teacher_update_course_post_getid():
    courseid = request.form.get('courseid')
    return render_template('teacher/teacher-update-course.html', courseid=courseid, user_name=current_user.name)

@teacher.route('/teacher-update-course', methods=['POST'])
@login_required
def teacher_update_course_post():
    courseid = request.form.get('courseid')
    name = request.form.get('name')
    characters = string.ascii_letters + string.digits + string.punctuation
    randomkey = ''.join(random.choice(characters) for i in range(16))
    course = Course.query.filter_by(id=courseid).first()
    if request.method == 'POST':
        if course:
            if int(current_user.id) != int(course.id_teacher):
                return "Course doesn't belong to you"
            if Course.query.filter_by(entry_key=randomkey).first():
                return "Entry Key can't be the same as another course"

            db.session.delete(course)
            db.session.commit()
    
            course = Course(id=courseid, name=name, entry_key=randomkey, id_teacher=current_user.id, name_teacher=current_user.name)
 
            db.session.add(course)
            db.session.commit()
            return redirect('/teacher')
        return "ID does not exist"
 
    return redirect(url_for('teacher/teacher-update-course.html'))

@teacher.route('/teacher-delete-course', methods=['POST'])
@login_required
def teacher_delete_course_post():
    courseid = request.form.get('courseid')
    course = Course.query.filter_by(id=courseid).first()
    if request.method == 'POST':
        if course:
            studentlist = StudentList.query.filter_by(id_course=course.id)
            for list in studentlist:
                db.session.delete(list)
                db.session.commit() 
            db.session.delete(course)
            db.session.commit()
            return redirect('/teacher')
        abort(404)
 
    return render_template('teacher/teacher.html')

###################################################################################################
#                                Teacher-Reading                                                  #
###################################################################################################

@teacher.route('/teacher-create-reading')
@login_required
def teacher_create_reading():
    return render_template('teacher/teacher-create-reading.html', user_name=current_user.name)

@teacher.route('/teacher-create-reading', methods=['POST'])
@login_required
def teacher_create_reading_post():
    name = request.form.get('name')
    text = request.form.get('text')
    if request.method == 'POST':

        new_reading = Reading(name=name, text=text, id_teacher=current_user.id)

        db.session.add(new_reading)
        db.session.commit()
        return redirect('/teacher')
 
    return render_template('teacher/teacher-create-reading.html', user_name=current_user.name)

@teacher.route('/teacher-update-reading')
@login_required
def teacher_update_reading():
    return render_template('teacher/teacher-update-reading.html', user_name=current_user.name)

@teacher.route('/teacher-update-reading-getid', methods=['POST'])
@login_required
def teacher_update_reading_post_getid():
    readingid = request.form.get('readingid')
    return render_template('teacher/teacher-update-reading.html', readingid=readingid, user_name=current_user.name)

@teacher.route('/teacher-update-reading', methods=['POST'])
@login_required
def teacher_update_reading_post():
    name = request.form.get('name')
    text = request.form.get('text')
    readingid = request.form.get('readingid')

    reading = Reading.query.filter_by(id=readingid).first()
    if request.method == 'POST':
        if reading:
            if int(current_user.id) != int(reading.id_teacher):
                return "Reading doesn't belong to you"
            
            db.session.delete(reading)
            db.session.commit()
 
            reading = Reading(id=readingid, name=name, text=text, id_teacher=current_user.id)
 
            db.session.add(reading)
            db.session.commit()
            return redirect('/teacher')
        return "ID does not exist"
 
    return redirect(url_for('teacher/teacher-update-reading.html'))

@teacher.route('/teacher-delete-reading', methods=['POST'])
@login_required
def teacher_delete_reading_post():
    readingid = request.form.get('readingid')
    reading = Reading.query.filter_by(id=readingid).first()
    if request.method == 'POST':
        if reading:
            db.session.delete(reading)
            db.session.commit()
            return redirect('/teacher')
        abort(404)
 
    return render_template('teacher/teacher.html')

