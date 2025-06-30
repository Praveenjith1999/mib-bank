import random
from decimal import Decimal
from django.utils import timezone
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import *
from bankcustomer.models import *
from bankcustomer.models import CreatePassBook
from . serializers import *


class TransactionView(APIView):

    def generate_reference_number(self):
        while True:
            number = random.randint(1000000000, 9999999999)
            if not Transaction.objects.filter(reference_number=number).exists():
                return number

    def post(self, request, *args, **kwargs):
        try:
            data = request.data
            bank_account_number = data.get("bank_account_number")
            transaction_type = data.get("transaction_type")  # "deposit" or "withdraw"
            amount = Decimal(data.get("transaction_amount"))
            purpose = data.get("purpose", "")

            account = CreatePassBook.objects.get(bank_account_number=bank_account_number)

            if transaction_type == "withdraw":
                if account.total_balance < amount:
                    return Response({"error": "Insufficient balance"}, status=400)
                account.total_balance -= amount
            elif transaction_type == "deposit":
                account.total_balance += amount
            else:
                return Response({"error": "Invalid transaction type"}, status=400)

            account.save()
            reference_number = self.generate_reference_number()

            transaction = Transaction.objects.create(
                user_reference=account,
                bank_account_number=account.bank_account_number,
                name=account.name,
                transaction_type=transaction_type,
                transaction_amount=amount,
                total_balance=account.total_balance,
                account_type=account.account_type,
                purpose=purpose,
                reference_number=reference_number,
                transaction_date=timezone.now()
            )

            return Response({
                "message": f"{transaction_type.title()} successful",
                "reference_number": reference_number,
                "new_balance": str(account.total_balance)
            }, status=201)

        except CreatePassBook.DoesNotExist:
            print(f"Transaction error: e")  # Debug on backend
            return Response( status=status.HTTP_400_BAD_REQUEST)
        

class TransactionListByAccount(APIView):
    def get(self, request, account_number):
        transactions = Transaction.objects.filter(bank_account_number=account_number).order_by('-transaction_date')
        serializer = TransactionSerializer(transactions, many=True)
        return Response(serializer.data)
        



