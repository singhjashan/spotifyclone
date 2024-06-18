# Generated by Django 5.0 on 2024-01-18 07:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('SpotiFind', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Song',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('artist', models.CharField(max_length=200)),
                ('album', models.CharField(max_length=200)),
                ('audio_file', models.FileField(upload_to='songs/')),
            ],
        ),
    ]