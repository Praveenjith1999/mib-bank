# Generated by Django 4.2.23 on 2025-06-24 12:53

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('bankcustomer', '0002_remove_openingbankaccount_open_for_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Deposite',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('deposite_date', models.DateTimeField(auto_now_add=True)),
                ('deposite_amount', models.DecimalField(decimal_places=2, max_digits=10)),
                ('purpose', models.TextField(max_length=200)),
                ('reference_number', models.BigIntegerField(unique=True)),
                ('bank_account_number', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='bankcustomer.createpassbook')),
            ],
        ),
    ]
