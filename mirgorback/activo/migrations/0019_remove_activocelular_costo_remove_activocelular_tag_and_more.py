# Generated by Django 4.0.3 on 2022-04-27 23:49

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('activo', '0018_alter_activocelular_imei_alter_activostandar_ip'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='activocelular',
            name='costo',
        ),
        migrations.RemoveField(
            model_name='activocelular',
            name='tag',
        ),
        migrations.RemoveField(
            model_name='activogeneral',
            name='costo',
        ),
        migrations.RemoveField(
            model_name='activoindustrial',
            name='costo',
        ),
        migrations.RemoveField(
            model_name='activonotebook',
            name='costo',
        ),
        migrations.RemoveField(
            model_name='activonotebook',
            name='tag',
        ),
        migrations.RemoveField(
            model_name='activostandar',
            name='costo',
        ),
    ]
