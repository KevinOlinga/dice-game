# sessionConfig/models.py

from django.db import models

class GameSession(models.Model):
    player_name = models.CharField(max_length=100)
    dice_value = models.IntegerField()  # Valeur du dé (1 à 6)
    num_of_rolls = models.IntegerField(default=1)  # Nombre de lancers de dés
    session_name = models.CharField(max_length=100, blank=True, null=True)  # Nom de la session

    def __str__(self):
        return f'{self.player_name} - {self.dice_value}'
