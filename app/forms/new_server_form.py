from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError

def name_too_long(form, field):
  name = field.data
  if len(name) > 50:
    raise ValidationError('Solar System names must less than 50 characters')

class NewServerForm(FlaskForm):
  admin_id = IntegerField('admin_id', validators=[DataRequired()])
  name = StringField('name', validators=[DataRequired(), name_too_long])
