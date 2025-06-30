from django.shortcuts import render
from . models import *
from . serializers import *
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
import random

from rest_framework import status


from django.views.decorators.csrf import csrf_exempt

# Create your views here.
 
 

class OpenCustomerAccount_Fun(APIView):

    def post(self, request):
        newuser = OpeningCustomerAccount_serializer(data=request.data)
        if newuser.is_valid():
            newuser.save()
            return Response(
                {"message": "Customer registered Successfully."},
                status=status.HTTP_201_CREATED
            )
        else:
            return Response(
                {
                    "error": "Validation Failed",
                    "details": newuser.errors
                },
                status=status.HTTP_400_BAD_REQUEST
            )

    def get(self, request, id=None):
        if id is not None:
            try:
               
                customer = OpeningBankAccount.objects.get(id=id)
                serializer = OpeningCustomerAccount_serializer(customer)
                return Response(serializer.data)
            except OpeningBankAccount.DoesNotExist:
                return Response({"error": "Customer not found"}, status=404)
        else:
            customers = OpeningBankAccount.objects.all()
            serializer =OpeningCustomerAccount_serializer(customers, many=True)
            return Response(serializer.data)

    def delete(self, request, id):
        try:
            selected_user = OpeningBankAccount.objects.get(id=id)
            selected_user.delete()
            return Response({"message": "User successfully deleted."}, status=status.HTTP_204_NO_CONTENT)
        except OpeningBankAccount.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

    def put(self, request, id):
        try:
            selected_user = OpeningBankAccount.objects.get(id=id)
            update_user = OpeningCustomerAccount_serializer(selected_user, data=request.data)
            if update_user.is_valid():
                update_user.save()
                return Response({"message": "Data successfully updated."})
            else:
                return Response(update_user.errors, status=status.HTTP_400_BAD_REQUEST)
        except OpeningBankAccount.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

    def patch(self, request, id):
        try:
            selected_user = OpeningBankAccount.objects.get(id=id)
            update_user = OpeningCustomerAccount_serializer(selected_user, data=request.data, partial=True)
            if update_user.is_valid():
                update_user.save()
                return Response({"message": "Data successfully updated."})
            else:
                return Response(update_user.errors, status=status.HTTP_400_BAD_REQUEST)
        except OpeningBankAccount.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

class CreatePassbook_Fun(APIView):
    generated_numbers = set()

    @classmethod
    def generate_Bankaccouuntnumber(cls):
        while True:
            number = random.randint(1000000000, 9999999999)
            if number not in cls.generated_numbers:
                cls.generated_numbers.add(number)
                return number

    # ✅ POST - Create passbook (bank account)
    def post(self, request, pk, *args, **kwargs):
        try:
            print(f"Creating account for user ID: {pk}")
            user = OpeningBankAccount.objects.get(pk=pk) # ✅ FIXE
            # Check if account already exists for this user
            if CreatePassBook.objects.filter(user_reference=user).exists():
                return Response({'error': 'Account already exists for this user'}, status=400)

            account_number = self.generate_Bankaccouuntnumber()

            new_passbook = CreatePassBook.objects.create(
                user_reference=user,
                name=user.name,
                address=user.address,
                mobile_number=user.mobile_number,
                bank_account_number=account_number,
                account_type=user.account_type
            )

            return Response({
                'message': 'Bank account created successfully',
                'account_number': new_passbook.bank_account_number
            }, status=status.HTTP_201_CREATED)

        except CreatePassBook.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    # ✅ GET - Retrieve single or all passbooks
    def get(self, request, pk=None):
        try:
            if pk is not None:
                passbook = CreatePassBook.objects.get(pk=pk)
                serializer = CreatePassbook_Serializer(passbook)
                return Response(serializer.data)
            else:
                all_passbooks = CreatePassBook.objects.all()
                serializer = CreatePassbook_Serializer(all_passbooks, many=True)
                return Response(serializer.data)
        except CreatePassBook.DoesNotExist:
            return Response({"error": "Passbook not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)