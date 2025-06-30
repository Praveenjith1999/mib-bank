from django.db import models



# Create your models here.


class OpeningBankAccount(models.Model):
    name=models.CharField(max_length=100,null=False,blank=False)
    age=models.IntegerField(null=False,blank=False)
    date_of_birth=models.DateField()
    gender=models.CharField(max_length=10,null=False,blank=False,choices=[
        ("Male","Male"),
        ("Female","Female"),
    ])
    mobile_number=models.BigIntegerField(null=False,blank=False)
    email=models.EmailField(null=True,blank=True)
    address=models.TextField()
    states=[
        ("Tamil nadu","Tamil nadu"),
        ("Kerala","Kerala"),
        ("Andra pradesh","Andra pradesh"),
        ("Telengana","Telengana"),
        ("Karnataka","Karnataka"),
        ("Pondichery","Pondichery") ,  

    ]
    state=models.CharField(null=False,blank=False,choices=states,max_length=20)
    districs=[
        ("Madurai","Madurai"),
        ("Sivagangi","Siavgangai"),
        ("Melur","Melur"),
        ("Coimbatore","Coimbatore"),
        ("Chennai","Chennai"),
        ("Erode","Erode"),
        ("Salem","Salem"),
        ("Nilagiri","Nilagiri"),
        ("Ramanathapuram","Ramanathapuram"),
        ("Jaffana","Jaffana"),
    ]
    distric=models.CharField(null=False,blank=False,choices=districs,max_length=20)
    pan_number=models.CharField(unique=True,null=False,max_length=10)
    adhaar_number=models.BigIntegerField(unique=True,null=False,blank=False)
    nominee_name=models.CharField(max_length=100,null=True,blank=True)
    relation=[
        ("Mother","Mother"),
        ("Father","Father"),
        ("Wife","Wife"),
        ("Husbend","Husbend"),
        ("Blood-brother","Blood-brother"),
        ("Blood-sister",'Blood-sister'),
        ("Relation","Relation"),
        ("others","others"),
    ]
    nominee_relation=models.CharField(max_length=20,choices=relation)
    nominee_aadhar_number=models.BigIntegerField(unique=True,null=True,blank=True)
    account_type=models.CharField(max_length=20,null=False,blank=False,choices=[
        ("Saving Account","Saving Account"),
        ("Current Account","Current Account"),
        ("Salary Account","Salary Account"),
        ("NRI Account","NRI Account"),
        ("NRE Account","NRE Account"),
        ("Employee Account","Employee Account"),
    ])
    aggre=models.BooleanField(default=True,null=False,blank=False)






class CreatePassBook(models.Model):
    user_reference=models.OneToOneField(OpeningBankAccount,on_delete=models.CASCADE)
    name=models.CharField(max_length=50)
    address=models.TextField(default="Madurai")
    mobile_number=models.BigIntegerField(max_length=10)
    bank_account_number=models.BigIntegerField(unique=True,null=False,blank=False)
    ifsc_code=models.CharField(max_length=10,default="MIB0010242")
    account_oppening_date=models.DateField(auto_now_add=True)
    account_type=models.CharField(max_length=50)
    total_balance = models.DecimalField(max_digits=10, decimal_places=2, default=0) 
    

    



    def __str__(self):
        return f"${self.name} - ${self.adhaar_number}"



    
    



