from rest_framework import serializers
from .models import *



class OpeningCustomerAccount_serializer(serializers.ModelSerializer):
    class Meta:
        model=OpeningBankAccount
        fields="__all__"






class CreatePassbook_Serializer(serializers.ModelSerializer):
    user_id = serializers.SerializerMethodField()

    def get_user_id(self, obj):
        return obj.user_reference.id

    class Meta:
        model = CreatePassBook
        fields = '__all__'



class OpeningBankAccountSerializer(serializers.ModelSerializer):
    passbook_id = serializers.SerializerMethodField()

    def get_passbook_id(self, obj):
        try:
            return obj.createpassbook.id
        except:
            return None





class OpeningBankAccountSerializer(serializers.ModelSerializer):
    passbook_id = serializers.SerializerMethodField()

    def get_passbook_id(self, obj):
        try:
            return obj.createpassbook.id
        except:
            return None

    class Meta:
        model = OpeningBankAccount
        fields = '__all__'
