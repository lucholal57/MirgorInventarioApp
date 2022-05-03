# Generated by Django 4.0.3 on 2022-05-02 14:14

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('linea_telefonica', '0002_alter_lineatelefonica_numero'),
        ('activo', '0021_remove_activocelular_inventario_and_more'),
        ('usuario', '0004_usuario_linea_telefonica'),
    ]

    operations = [
        migrations.AlterField(
            model_name='usuario',
            name='activo_celular',
            field=models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, to='activo.activocelular'),
        ),
        migrations.AlterField(
            model_name='usuario',
            name='activo_notebook',
            field=models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, to='activo.activonotebook'),
        ),
        migrations.AlterField(
            model_name='usuario',
            name='linea_telefonica',
            field=models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, to='linea_telefonica.lineatelefonica'),
        ),
    ]