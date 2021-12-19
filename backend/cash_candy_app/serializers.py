from django.db import connections
from django.db.models import fields
from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from rest_framework_jwt.settings import api_settings
from django.contrib.auth.models import User
from cash_candy_app.models import Child, WishList, Item, AllowanceList, AllowanceDetail


## Serializes current user
class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['username']

## Serializes new user sign ups that responds with the new user's information including a new token.
class UserSerializerWithToken(serializers.ModelSerializer):

    token = serializers.SerializerMethodField()
    password = serializers.CharField(write_only=True)

    def get_token(self, obj):
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

        payload = jwt_payload_handler(obj)
        token = jwt_encode_handler(payload)
        return token

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    class Meta:
        model = User
        fields = ['token', 'username', 'password']


class ChildSerializer(ModelSerializer):
    class Meta:
        model = Child
        fields = ["id", "first_name", "date_of_birth", "user"]

    #display username instead of id
    def to_representation(self, child):
        repr = super().to_representation(child)

        repr["user"] = child.user.username

        return repr

class WishListSummarySerializer(ModelSerializer):
    class Meta:
        model = WishList
        fields = ["id", "list_name", "child"]

    #display child name instead of id
    def to_representation(self, list):
        repr = super().to_representation(list)

        repr["child"] = list.child.first_name

        return repr

class ItemSerializer(ModelSerializer):
    class Meta:
        model = Item
        fields = ["id", "wishlist", "item_name", "item_location", "item_id", "item_price", "item_image", "date_added", "purchased"]

    def to_representation(self, item):

        #return serialized item list
        self.fields["wishlist"] = WishListSummarySerializer()

        return super().to_representation(item)

class WishListSerializer(ModelSerializer):
    class Meta:
        model = WishList
        fields = ["id", "list_name", "items", "child"]

    items = ItemSerializer(many=True)

    #display child name instead of id
    def to_representation(self, list):
        repr = super().to_representation(list)

        repr["child"] = list.child.first_name

        return repr

class AllowanceListSummarySerializer(ModelSerializer):
    class Meta:
        model = AllowanceList
        fields = ["id", "allowance_list_name", "child"]

    #display child name instead of id
    def to_representation(self, list):
        repr = super().to_representation(list)

        repr["child"] = list.child.first_name

        return repr

class AllowanceDetailSerializer(ModelSerializer):
    class Meta:
        model = AllowanceDetail
        fields = ["id", "allowancelist", "transaction_description", "transaction_date", "transaction_amount"]

    def to_representation(self, transaction):

        #return serialized transaction detail list
        self.fields["allowancelist"] = AllowanceListSummarySerializer()

        return super().to_representation(transaction)

class AllowanceListSerializer(ModelSerializer):
    class Meta:
        model = AllowanceList
        fields = ["id", "allowance_list_name", "child"]

    # transactions = AllowanceDetailSerializer(many=True)

    #display child name instead of id
    def to_representation(self, list):
        repr = super().to_representation(list)

        repr["child"] = list.child.first_name

        return repr