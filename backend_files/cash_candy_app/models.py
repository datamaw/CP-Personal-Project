from django.db import models
from django.contrib.auth.models import User  #import django user model


class Child(models.Model):
    first_name = models.CharField(max_length=32, null=False)
    date_of_birth = models.DateTimeField(null=True, blank=True)
    user = models.ForeignKey(User, related_name="children", on_delete=models.CASCADE) #one user to possibly many children - foreign key 

    def __str__(self):
        return f"{self.first_name}"

class WishList(models.Model):
    list_name = models.CharField(max_length=64, null=False)
    child = models.ForeignKey(Child, related_name="wish_lists", on_delete=models.CASCADE) #one child to possibly many wishlists - foreign key 

    def __str__(self):
        return f"{self.list_name}"

class Item(models.Model):
    item_name = models.CharField(max_length=64, null=False)
    wishlist = models.ForeignKey(WishList, related_name="items", on_delete=models.CASCADE)  #one list to may items - foreignkey
    item_location = models.CharField(max_length=64)
    item_id = models.CharField(max_length=64, null=True)
    item_price = models.DecimalField(max_digits=6, decimal_places=2, null=False)
    item_image = models.ImageField(null=True, blank=True)
    date_added = models.DateTimeField(auto_now_add=True)
    purchased = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.item_name}"

class AllowanceList(models.Model):
    allowance_list_name = models.CharField(max_length=64, null=False)
    child = models.ForeignKey(Child, related_name="allowance_lists", on_delete=models.CASCADE)  #one child to possibly more than one spending list - foreign key

    def __str__(self):
        return f"{self.allowance_list_name}"

class AllowanceDetail(models.Model):
    transaction_description = models.TextField(null=False)
    allowancelist = models.ForeignKey(AllowanceList, related_name="allowance_detail", on_delete=models.CASCADE)  #one list to many transactions - foreign key
    transaction_date = models.DateTimeField(null=False)
    transaction_amount = models.DecimalField(max_digits=6, decimal_places=2, null=False)    

    def __str__(self):
        return f"{self.transaction_date, self.transaction_description}"