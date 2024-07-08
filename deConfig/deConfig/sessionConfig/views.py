from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import GameSession, Session
from .serializers import GameSessionSerializer, SessionSerializer

class GameSessionViewSet(viewsets.ModelViewSet):
    queryset = GameSession.objects.all()
    serializer_class = GameSessionSerializer

    def create(self, request, *args, **kwargs):
        player_name = request.data.get('player_name')
        dice_value = request.data.get('dice_value')
        num_of_rolls = request.data.get('num_of_rolls')
        session_name = request.data.get('session_name')

        session = GameSession.objects.create(
            player_name=player_name,
            dice_value=dice_value,
            num_of_rolls=num_of_rolls,
            session_name=session_name
        )

        serializer = self.get_serializer(session)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class SessionViewSet(viewsets.ModelViewSet):
    queryset = Session.objects.all()
    serializer_class = SessionSerializer

    def create(self, request, *args, **kwargs):
        session_id = request.data.get('session_id')
        num_dice = request.data.get('num_dice')
        num_games = request.data.get('num_games')
        wait_time = request.data.get('wait_time')

        session = Session.objects.create(
            session_id=session_id,
            num_dice=num_dice,
            num_games=num_games,
            wait_time=wait_time
        )

        serializer = self.get_serializer(session)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
