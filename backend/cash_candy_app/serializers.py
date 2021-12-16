from django.db import connections
from django.db.models import fields
from rest_framework.serializers import ModelSerializer
from cash_candy_app.models import User, Child, WishList, Item, AllowanceList, AllowanceDetail


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