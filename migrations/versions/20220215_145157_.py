"""empty message

Revision ID: 619177dd04a5
Revises: 1cbf538783ce
Create Date: 2022-02-15 14:51:57.457844

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '619177dd04a5'
down_revision = '1cbf538783ce'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('direct_channels',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('updated_at', sa.DateTime(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('direct_channels')
    # ### end Alembic commands ###
