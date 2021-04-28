"""tiles URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path

from rest_framework import routers
from rest_framework.schemas import get_schema_view
from rest_framework.renderers import JSONOpenAPIRenderer

from tiles import views


router = routers.DefaultRouter()
router.register(r'tiles', views.TileViewSet)
router.register(r'tasks', views.TaskViewSet)


# schema_url_patterns = [
#     path('api/v1/', include(router.urls)),
# ]


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/', include(router.urls)),
    # https://www.django-rest-framework.org/api-guide/schemas/#generating-a-dynamic-schema-with-schemaview
    path('api/v1/openapi.json', get_schema_view(
        title="Task Tiles",
        description="A task tile Open API",
        version="0.1.0",
        renderer_classes=[JSONOpenAPIRenderer]
    )),

]
