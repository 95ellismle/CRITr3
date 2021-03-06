# Generated by Django 3.0.2 on 2020-01-14 15:35

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Track',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('x', models.FloatField()),
                ('y', models.FloatField()),
                ('latitude', models.FloatField()),
                ('longitude', models.FloatField()),
                ('datetime', models.DateTimeField(default=django.utils.timezone.now)),
                ('trackID', models.IntegerField()),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Incident',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('incidentType', models.CharField(choices=[('Littering', 'Littering'), ('Loitering', 'Loitering'), ('Graffiti', 'Graffiti'), ('Speeding', 'Speeding'), ('Parking', 'Parking')], max_length=200)),
                ('incidentTime', models.TimeField(default=django.utils.timezone.now)),
                ('incidentDate', models.DateField(default=django.utils.timezone.now)),
                ('latitude', models.FloatField()),
                ('longitude', models.FloatField()),
                ('x', models.FloatField()),
                ('y', models.FloatField()),
                ('details', models.TextField(blank=True, null=True)),
                ('photoPath', models.ImageField(upload_to='incidentPhotos/%Y/%m/%d')),
                ('timeSubmitted', models.DateTimeField(default=django.utils.timezone.now)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
