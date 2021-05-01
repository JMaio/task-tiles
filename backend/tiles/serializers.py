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
            "url",
            "id",
            "order",
            "title",
            "description",
            "task_type",
            # "parent_tile_id"
        ]


class TileSerializer(serializers.HyperlinkedModelSerializer):
    tasks = TaskSerializer(many=True, required=False)

    class Meta:
        model = Tile
        # fields = "__all__"
        fields = [
            "url",
            "id",
            "get_status_display",
            "status",
            "launch_date",
            "tasks",
        ]
        # https://stackoverflow.com/a/58162118/9184658
        # extra_kwargs = {
        #     'tasks': {'required': False},
        # }
