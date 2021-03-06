# Generated by Django 4.0.3 on 2022-03-29 14:08

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('activo', '0017_remove_activocelular_fecha_entrega_and_more'),
        ('usuario', '0002_alter_usuario_correo'),
    ]

    operations = [
        migrations.AddField(
            model_name='usuario',
            name='activo_celular',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='activo.activocelular'),
        ),
        migrations.AddField(
            model_name='usuario',
            name='activo_notebook',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='activo.activonotebook'),
        ),
        migrations.AddField(
            model_name='usuario',
            name='fecha_entrega',
            field=models.DateField(null=True),
        ),
    ]
