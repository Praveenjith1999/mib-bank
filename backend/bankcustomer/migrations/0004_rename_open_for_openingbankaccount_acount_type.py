# Generated by Django 4.2.23 on 2025-06-24 13:54

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('bankcustomer', '0003_rename_account_type_openingbankaccount_open_for'),
    ]

    operations = [
        migrations.RenameField(
            model_name='openingbankaccount',
            old_name='open_for',
            new_name='acount_type',
        ),
    ]
