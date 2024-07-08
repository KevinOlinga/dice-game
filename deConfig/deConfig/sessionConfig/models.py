from django.db import models

class GameSession(models.Model):
    player_name = models.CharField(max_length=100)
    dice_value = models.IntegerField()  # Valeur du dé (1 à 6)
    num_of_rolls = models.IntegerField(default=1)  # Nombre de lancers de dés
    session_name = models.CharField(max_length=100, blank=True, null=True)  # Nom de la session

    def __str__(self):
        return f'{self.player_name} - {self.dice_value}'

class Session(models.Model):
    session_id = models.CharField(max_length=100, unique=True)
    num_dice = models.IntegerField()
    num_games = models.IntegerField()
    wait_time = models.IntegerField()

    def __str__(self):
        return f"Session {self.session_id} - {self.num_dice} dés - {self.num_games} jeux"
