# Generated by Django 5.2.3 on 2025-06-28 19:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bankservice', '0007_deposite_name_withdraw'),
    ]

    operations = [
        migrations.AddField(
            model_name='withdraw',
            name='name',
            field=models.CharField(default=1, max_length=200),
            preserve_default=False,
        ),
    ]
