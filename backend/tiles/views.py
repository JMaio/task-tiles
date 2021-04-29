from django.shortcuts import render
from rest_framework import mixins, permissions, viewsets, generics

from .models import Task, Tile
from .serializers import TaskSerializer, TileSerializer

# Create your views here.

# https://www.django-rest-framework.org/tutorial/quickstart/#views


class TaskViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows tasks to be viewed or edited.
    """
    queryset = Task.objects.all().order_by('order')
    serializer_class = TaskSerializer
    permission_classes = [permissions.AllowAny] # any user can modify records


class TileViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows tiles to be viewed or edited.
    """
    queryset = Tile.objects.all()
    serializer_class = TileSerializer
    permission_classes = [permissions.AllowAny] # any user can modify records
