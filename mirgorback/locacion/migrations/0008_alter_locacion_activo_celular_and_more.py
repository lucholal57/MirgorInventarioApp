# Generated by Django 4.0.3 on 2022-04-22 06:49

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('activo', '0017_remove_activocelular_fecha_entrega_and_more'),
        ('locacion', '0007_locacion_fecha'),
    ]

    operations = [
        migrations.AlterField(
            model_name='locacion',
            name='activo_celular',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='activo.activocelular'),
        ),
        migrations.AlterField(
            model_name='locacion',
            name='activo_general',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='activo.activogeneral'),
        ),
        migrations.AlterField(
            model_name='locacion',
            name='activo_industrial',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='activo.activoindustrial'),
        ),
        migrations.AlterField(
            model_name='locacion',
            name='activo_notebook',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='activo.activonotebook'),
        ),
        migrations.AlterField(
            model_name='locacion',
            name='activo_standar',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='activo.activostandar'),
        ),
    ]
