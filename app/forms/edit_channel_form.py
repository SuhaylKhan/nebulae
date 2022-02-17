from flask_wtf import FlaskForm
from wtforms import StringField, DateTimeField
from wtforms.validators import DataRequired, ValidationError

def name_too_long(form, field):
  name = field.data
  if len(name) > 50:
    raise ValidationError('Planet names must less than 50 characters')

def description_too_long(form, field):
  description = field.data
  if len(description) > 2000:
    raise ValidationError('Descriptions names must less than 2000 characters')

class EditChannelForm(FlaskForm):
  name = StringField('name', validators=[DataRequired(), name_too_long])
  description = StringField('description', validators=[description_too_long])
