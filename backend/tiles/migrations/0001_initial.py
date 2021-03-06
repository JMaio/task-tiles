# Generated by Django 2.2.20 on 2021-04-28 13:47

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Tile',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('launch_date', models.DateTimeField()),
                ('status', models.CharField(choices=[('LIVE', 'Live'), ('PEND', 'Pending'), ('ARCH', 'Archived')], max_length=10)),
            ],
        ),
        migrations.CreateModel(
            name='Task',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=40)),
                ('order', models.PositiveIntegerField()),
                ('description', models.TextField()),
                ('task_type', models.CharField(choices=[('survey', 'Survey'), ('discussion', 'Discussion'), ('diary', 'Diary')], max_length=30)),
                ('parent_tile', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='tiles.Tile')),
            ],
        ),
    ]
