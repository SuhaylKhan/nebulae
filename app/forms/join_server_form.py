from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError

class JoinServerForm(FlaskForm):
  user_id = IntegerField('user_id', validators=[DataRequired()])
  server_id = IntegerField('server_id', validators=[DataRequired()])
  server_name = StringField('server_name', validators=[DataRequired()])
