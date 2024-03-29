from django.urls import path
from rest_framework.routers import DefaultRouter
from cash_candy_app.views import UserList, ChildViewSet, WishListViewSet, ItemViewSet, AllowanceListViewSet, AllowanceDetailViewSet
from .views import current_user, UserList

urlpatterns = [
    path('current_user/', current_user),
    path('users/', UserList.as_view())
]

# create router instance
r = DefaultRouter()

# associate viewsets
r.register(r"child", ChildViewSet, basename="child")
r.register(r"wish-list", WishListViewSet, basename="wish-list")
r.register(r"item", ItemViewSet, basename="item-list")
r.register(r"transaction", AllowanceListViewSet, basename="transactions")
r.register(r"detail", AllowanceDetailViewSet, basename="transaction-detail")

# get urls
urlpatterns += r.urls