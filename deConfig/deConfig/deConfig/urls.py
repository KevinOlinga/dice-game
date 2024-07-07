# deConfig/urls.py

from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('sessionConfig.urls')),  # Inclure les URLs de sessionConfig
]
