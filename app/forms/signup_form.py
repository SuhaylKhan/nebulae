from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use')


class SignUpForm(FlaskForm):
    first_name = StringField('first_name', validators=[DataRequired('FIRST NAME is a required field')])
    last_name = StringField('last_name', validators=[DataRequired('LAST NAME is a required field')])
    username = StringField(
        'username', validators=[DataRequired('USERNAME is a required field'), username_exists])
    email = StringField('email', validators=[DataRequired('EMAIL is a required field'), Email('Invalid email address'), user_exists])
    password = StringField('password', validators=[DataRequired('PASSWORD and CONFIRM PASSWORD are required fields')])
