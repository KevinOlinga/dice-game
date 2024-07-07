# sessionConfig/serializers.py

from rest_framework import serializers
from .models import GameSession

class GameSessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = GameSession
        fields = ['id', 'player_name', 'dice_value', 'num_of_rolls', 'session_name']
