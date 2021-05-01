from django.db import models

# Create your models here.

# https://docs.djangoproject.com/en/2.2/intro/tutorial02/


class Tile(models.Model):
    """
    We group tasks together in a container which we call a tile. 
    Each tile has: 
    - a launch date 
    - a status
    The status can be either live, pending or archived. 
    A tile can be made up of one or many tasks. 
    A task can only belong to a single tile.
    """
    launch_date = models.DateTimeField()

    STATUS_TYPES = [
        ('LIVE', 'Live'),
        ('PEND', 'Pending'),
        ('ARCH', 'Archived'),
    ]
    status = models.CharField(
        max_length=10,
        choices=STATUS_TYPES
    )

    def __str__(self) -> str:
        return f"Tile[{self.get_status_display()}] ({self.launch_date})"


class Task(models.Model):
    """
    each task has:
    - a title, 
    - an order field, 
    - a description
    - a type (such as survey, discussion, diary).
    """
    title = models.CharField(max_length=40)

    order = models.PositiveIntegerField()

    description = models.TextField()

    TASK_TYPES = [
        ('survey', 'Survey'),
        ('discussion', 'Discussion'),
        ('diary', 'Diary'),
    ]
    task_type = models.CharField(
        max_length=30,
        choices=TASK_TYPES
    )

    parent_tile = models.ForeignKey(
        Tile,
        related_name='tasks',
        on_delete=models.PROTECT
    )

    def __str__(self) -> str:
        return f"Task: {self.title} ({self.get_task_type_display()} in {self.parent_tile})"

    class Meta:
        # set the ordering of the tasks
        # https://stackoverflow.com/a/60214106/9184658
        ordering = ["order", "id"]
