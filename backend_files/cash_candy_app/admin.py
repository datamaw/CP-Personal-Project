from django.contrib import admin
from cash_candy_app.models import Child, WishList, Item, AllowanceList, AllowanceDetail 

# Register your models here.
allModels = [Child, WishList, Item, AllowanceList, AllowanceDetail]
admin.site.register(allModels)