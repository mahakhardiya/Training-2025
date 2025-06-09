"""Add name and role to user model

Revision ID: 0b91cd2c1e56
Revises: 678dd0a82480
Create Date: 2024-05-10 12:00:00

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '0b91cd2c1e56'
down_revision: Union[str, None] = '678dd0a82480' # Make sure this ID matches your previous migration
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


# Define the ENUM type object here so we can reuse it
user_role_enum = sa.Enum('ADMIN', 'USER', name='userrole')


def upgrade() -> None:
    # First, create the new 'userrole' ENUM type in the database.
    # This must happen before any column tries to use it.
    user_role_enum.create(op.get_bind())

    # Now, add the new columns to the 'users' table.
    op.add_column('users', sa.Column('name', sa.String(), nullable=True))
    op.add_column(
        'users',
        sa.Column(
            'role',
            user_role_enum,  # Use the enum object we defined
            nullable=False,
            server_default='USER' # Set a default for any existing rows
        )
    )
    op.create_index(op.f('ix_users_name'), 'users', ['name'], unique=False)


def downgrade() -> None:
    # In reverse order, drop the index and the columns first.
    op.drop_index(op.f('ix_users_name'), table_name='users')
    op.drop_column('users', 'role')
    op.drop_column('users', 'name')

    # Finally, after no columns are using it, drop the 'userrole' ENUM type.
    user_role_enum.drop(op.get_bind())