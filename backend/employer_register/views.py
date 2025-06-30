from django.shortcuts import render
from .models import *
from .serializers import *
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from django.contrib.auth.hashers import check_password
from django.contrib.auth import authenticate
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt

# -------------------- Login API --------------------


class LoginView(APIView):
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        user = authenticate(username=username, password=password)

        if user is not None:
            return Response({"message": "Login successful"}, status=status.HTTP_200_OK)
        else:
            return Response({"message": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

# -------------------- Employee Register API --------------------
class EmployeeRegisterView(APIView):

    def post(self, request):
        newuser = EmployeeRegister_Serializer(data=request.data)
        if newuser.is_valid():
            newuser.save()
            return Response({"message": "User Registered Successfully."}, status=status.HTTP_201_CREATED)
        return Response({"error": "Validation Failed", "details": newuser.errors}, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, id=None):
        if id is None:
            getusers = Employee_register.objects.all()
            viewusers = EmployeeRegister_Serializer(getusers, many=True).data
            return Response(viewusers)
        else:
            try:
                getuser = Employee_register.objects.get(id=id)
                viewusers = EmployeeRegister_Serializer(getuser).data
                return Response(viewusers)
            except Employee_register.DoesNotExist:
                return Response({"error": "User not found"}, status=404)

    def put(self, request, id):
        try:
            selecteduser = Employee_register.objects.get(id=id)
        except Employee_register.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

        updateuser = EmployeeRegister_Serializer(selecteduser, data=request.data, partial=True)
        if updateuser.is_valid():
            updateuser.save()
            return Response(updateuser.data, status=status.HTTP_200_OK)
        return Response(updateuser.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, id):
        return self.put(request, id)  # same as PUT logic

    def delete(self, request, id):
        try:
            selecteduser = Employee_register.objects.get(id=id)
            selecteduser.delete()
            return Response({"message": "User successfully deleted"})
        except Employee_register.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)


# -------------------- Login/Logout Register API --------------------


class LoginLogout(APIView):

    def post(self, request):
        user = LoginLogout_Serializers(data=request.data)
        if user.is_valid():
            user.save()
            return Response({"message": "User Registered Successfully."}, status=status.HTTP_201_CREATED)
        return Response({"errors": user.errors}, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, id=None):
        if id is None:
            users = SignUpEmployees.objects.all()
            serializer = LoginLogout_Serializers(users, many=True)
            return Response(serializer.data)
        try:
            user = SignUpEmployees.objects.get(id=id)
            serializer = LoginLogout_Serializers(user)
            return Response(serializer.data)
        except SignUpEmployees.DoesNotExist:
            return Response({"error": "User not found"}, status=404)

    def put(self, request, id):
        try:
            user = SignUpEmployees.objects.get(id=id)
        except SignUpEmployees.DoesNotExist:
            return Response({"error": "User not found"}, status=404)

        serializer = LoginLogout_Serializers(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

    def patch(self, request, id):
        return self.put(request, id)

    def delete(self, request, id):
        try:
            user = SignUpEmployees.objects.get(id=id)
            user.delete()
            return Response({"message": "User successfully deleted"})
        except SignUpEmployees.DoesNotExist:
            return Response({"error": "User not found"}, status=404)
