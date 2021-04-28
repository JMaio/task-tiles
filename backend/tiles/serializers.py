from django.contrib.auth.models import User, Group
from .models import (
    Tile, Task
)
from rest_framework import serializers

# https://www.django-rest-framework.org/tutorial/quickstart/#serializers


class TaskSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Task
        fields = "__all__"


class TileSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Tile
        fields = "__all__"
