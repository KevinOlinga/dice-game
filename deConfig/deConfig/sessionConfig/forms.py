# sessionConfig/forms.py

from django import forms

class SessionForm(forms.Form):
    session_id = forms.IntegerField(required=True)
    num_dice = forms.IntegerField(required=True)
    num_games = forms.IntegerField(required=True)
    wait_time = forms.IntegerField(required=True)
