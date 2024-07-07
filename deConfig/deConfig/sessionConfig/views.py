# sessionConfig/views.py

from rest_framework import viewsets
from .models import GameSession
from .serializers import GameSessionSerializer

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
