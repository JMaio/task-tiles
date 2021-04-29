from django.contrib.auth.models import User, Group
from .models import (
    Tile, Task
)
from rest_framework import serializers

# https://www.django-rest-framework.org/tutorial/quickstart/#serializers


class TaskSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Task
        # fields = "__all__"
        fields = [
            "id",
            "order",
            "title",
            "description",
            "task_type",
            # "parent_tile_id"
        ]


class TileSerializer(serializers.HyperlinkedModelSerializer):
    tasks = TaskSerializer(many=True)

    class Meta:
        model = Tile
        # fields = "__all__"
        fields = [
            "id",
            "get_status_display",
            "launch_date",
            "tasks",
        ]
