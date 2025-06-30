from django.db import *
from rest_framework.serializers import *






# Create your models here.



    

class Employee_register(models.Model):
    emp_id = models.CharField(max_length=100)
    emp_name = models.CharField(max_length=100)
    gender = models.CharField(max_length=10, choices=[
        ('Male', 'Male'),
        ('Female', 'Female'),
       
    ])
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=15, unique=True)
    age = models.IntegerField(default=0)
    choice=[
        ('Manager', 'Manager'),
        ('Asst.Manager', 'Asst.Manager'),
        ('Accountant', 'Accountant'),
        ('Cashier', 'Cashier'),
        ('Loan-Section', 'Loan-Section'),
    ]
    qualification = models.CharField(max_length=100)
    designation = models.CharField(max_length=50, choices=choice)
    branch = models.CharField(max_length=50)
    address = models.TextField(null=True, blank=True)
    city=models.CharField(max_length=50)
    joining_date = models.DateField()
    pf_number = models.BigIntegerField(unique=True)
    aadhaar_number = models.CharField(max_length=12, unique=True)
    pan_number = models.CharField(max_length=10, unique=True)
    bank_name = models.CharField(max_length=100)
    bank_branch = models.CharField(max_length=100)
    bank_account_number = models.CharField(max_length=20, unique=True)
    ifsc_code = models.CharField(max_length=11)
  


    
   


    def __str__(self):
     return self.emp_name + f" ({self.emp_id})"

    


class SignUpEmployees(models.Model):
    user_reference=models.OneToOneField(Employee_register,on_delete=models.CASCADE)
    username=models.CharField(max_length=20,unique=True,null=False,blank=False)
    password=models.CharField(max_length=250,null=False,blank=False)
    confirm_password=models.CharField(max_length=250,null=False,blank=False)

   
