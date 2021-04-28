from django.shortcuts import render

# Create your views here.

# https://www.django-rest-framework.org/tutorial/quickstart/#views

from rest_framework import viewsets
from rest_framework import permissions

from .serializers import (
    TileSerializer, TaskSerializer
)
from .models import (
    Tile, Task
)


class TaskViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows tasks to be viewed or edited.
    """
    queryset = Task.objects.all().order_by('order')
    serializer_class = TaskSerializer
    # permission_classes = [permissions.IsAuthenticated]


class TileViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows tiles to be viewed or edited.
    """
    queryset = Tile.objects.all()
    serializer_class = TileSerializer
    # permission_classes = [permissions.IsAuthenticated]
