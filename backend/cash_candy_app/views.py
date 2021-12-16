from django.db import models
from django.http.response import JsonResponse
from django.shortcuts import render
from rest_framework import serializers
from cash_candy_app.serializers import ChildSerializer, WishListSerializer, ItemSerializer, AllowanceListSerializer, AllowanceDetailSerializer
from cash_candy_app.models import Child, WishList, Item, AllowanceList, AllowanceDetail
from rest_framework.viewsets import ModelViewSet


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