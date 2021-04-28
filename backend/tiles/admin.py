from django.contrib import admin

# Register your models here.

# https://docs.djangoproject.com/en/2.2/intro/tutorial02/#make-the-poll-app-modifiable-in-the-admin

from .models import (
    Tile,
    Task
)

admin.site.register(Tile)
admin.site.register(Task)
