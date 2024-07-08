from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import GameSessionViewSet, SessionViewSet

router = DefaultRouter()
router.register(r'game_sessions', GameSessionViewSet)
router.register(r'sessions', SessionViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
