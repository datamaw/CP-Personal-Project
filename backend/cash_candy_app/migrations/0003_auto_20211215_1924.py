# Generated by Django 3.2.9 on 2021-12-15 19:24

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('cash_candy_app', '0002_auto_20211215_1903'),
    ]

    operations = [
        migrations.AlterField(
            model_name='allowancelist',
            name='child',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='allowance_lists', to='cash_candy_app.child'),
        ),
        migrations.AlterField(
            model_name='child',
            name='date_of_birth',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='item',
            name='item_image',
            field=models.ImageField(blank=True, null=True, upload_to=''),
        ),
        migrations.AlterField(
            model_name='wishlist',
            name='child',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='wish_lists', to='cash_candy_app.child'),
        ),
    ]
