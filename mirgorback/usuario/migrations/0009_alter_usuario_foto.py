# Generated by Django 4.0.3 on 2022-06-13 13:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('usuario', '0008_usuario_foto'),
    ]

    operations = [
        migrations.AlterField(
            model_name='usuario',
            name='foto',
            field=models.ImageField(blank=True, upload_to=''),
        ),
    ]
