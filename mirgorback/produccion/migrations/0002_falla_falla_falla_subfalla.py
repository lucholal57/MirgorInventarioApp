# Generated by Django 4.0.3 on 2022-09-08 11:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('produccion', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='falla',
            name='falla',
            field=models.CharField(default=1, max_length=20),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='falla',
            name='subfalla',
            field=models.CharField(default=1, max_length=20),
            preserve_default=False,
        ),
    ]