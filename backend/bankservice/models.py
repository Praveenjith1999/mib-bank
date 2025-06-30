from django.db import models
from bankcustomer.models import CreatePassBook


class Transaction(models.Model):
    TRANSACTION_TYPES = (
        ('deposit', 'Deposit'),
        ('withdraw', 'Withdraw'),
    )

    user_reference = models.ForeignKey(CreatePassBook, on_delete=models.CASCADE)
    bank_account_number = models.BigIntegerField()
    name = models.CharField(max_length=200)
    transaction_type = models.CharField(max_length=10, choices=TRANSACTION_TYPES)
    transaction_amount = models.DecimalField(max_digits=10, decimal_places=2)
    total_balance = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    account_type = models.CharField(max_length=20)
    purpose = models.TextField(max_length=200)
    reference_number = models.BigIntegerField(unique=True)
    transaction_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.transaction_type.title()} {self.reference_number} - {self.transaction_amount}"
