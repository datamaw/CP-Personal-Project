# Generated by Django 3.2.9 on 2021-12-30 15:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cash_candy_app', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='item',
            name='item_image',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='item',
            name='item_location',
            field=models.TextField(),
        ),
    ]
