# Generated by Django 4.0.3 on 2022-04-12 11:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('locacion', '0006_remove_locacion_puesto_locacion_activo_celular_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='locacion',
            name='fecha',
            field=models.DateField(blank=True, null=True),
        ),
    ]
