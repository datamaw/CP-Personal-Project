from django.db import models
from django.http.response import JsonResponse
from django.shortcuts import render
from rest_framework import serializers
from cash_candy_app.serializers import ChildSerializer, WishListSerializer, ItemSerializer, AllowanceListSerializer, AllowanceDetailSerializer
from cash_candy_app.models import Child, WishList, Item, AllowanceList, AllowanceDetail
from rest_framework.viewsets import ModelViewSet
from django.http import HttpResponseRedirect
from django.contrib.auth.models import User
from rest_framework import permissions, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserSerializer, UserSerializerWithToken

## The core of this functionality is the api_view decorator, which takes a list of HTTP methods that your view should respond to.
@api_view(['GET'])
def current_user(request):
    """
    Determine the current user by their token, and return their data
    """

    serializer = UserSerializer(request.user)
    return Response(serializer.data)

class UserList(APIView):
    """
    Create a new user. It's called 'UserList' because normally we'd have a get
    method here too, for retrieving a list of all User objects.
    """

    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = UserSerializerWithToken(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ChildViewSet(ModelViewSet):
    queryset = Child.objects.all()
    serializer_class = ChildSerializer

class WishListViewSet(ModelViewSet):
    queryset = WishList.objects.all()
    serializer_class = WishListSerializer

class ItemViewSet(ModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer

class AllowanceListViewSet(ModelViewSet):
    queryset = AllowanceList.objects.all()
    serializer_class = AllowanceListSerializer

class AllowanceDetailViewSet(ModelViewSet):
    queryset = AllowanceDetail.objects.all()
    serializer_class = AllowanceDetailSerializer