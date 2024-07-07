# sessionConfig/admin.py

from django.contrib import admin
from .models import Session

@admin.register(Session)
class SessionAdmin(admin.ModelAdmin):
    list_display = ('session_id', 'num_dice', 'num_games', 'wait_time')
