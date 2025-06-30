from rest_framework import serializers
from .models import *
from django.contrib.auth.hashers import make_password





class EmployeeRegister_Serializer(ModelSerializer):
    class Meta:
        model = Employee_register
        fields = '__all__'



class LoginLogout_Serializers(serializers.ModelSerializer):
    user_reference = serializers.PrimaryKeyRelatedField(queryset=Employee_register.objects.all())
    class Meta:
        model = SignUpEmployees
        fields = '__all__'

    def validate(self, data):
       
        if data.get('password') != data.get('confirm_password'):
         
            raise serializers.ValidationError("Passwords do not match.")
        return data

    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])  
        validated_data.pop('confirm_password', None)  
        return super().create(validated_data)








        

   

        

        

   
