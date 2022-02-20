from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def password_matches(form, field):
    # Checking if password matches
    password = field.data
    email = form.data['email']
    user = User.query.filter(User.email == email).first()
    if not user:
        raise ValidationError('Email or password is incorrect')
    if not user.check_password(password):
        raise ValidationError('Email or password is incorrect')


class LoginForm(FlaskForm):
    email = StringField('email', validators=[DataRequired('EMAIL is a required field'), Email('Invalid email address')])
    password = StringField('password', validators=[
                           DataRequired('PASSWORD is a required field'), password_matches])
