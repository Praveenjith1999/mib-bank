# Generated by Django 5.2.3 on 2025-06-23 10:08

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('employer_register', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='signupemployees',
            name='user_reference',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='employer_register.employee_register'),
            preserve_default=False,
        ),
    ]
