from rest_framework import serializers

from ...models import Company, Employee, Address


class AddressSerializerMixin(serializers.Serializer):
    address_1 = serializers.CharField(max_length=100, source='address.address_1')
    address_2 = serializers.CharField(max_length=100, source='address.address_2', required=False, allow_blank=True)
    zip = serializers.CharField(max_length=100, source='address.zip')
    post_code = serializers.CharField(max_length=100, source='address.post_code')

    def create(self, validated_data):
        address = validated_data.pop('address')
        address, _ = Address.objects.get_or_create(**address)
        validated_data['address'] = address
        return super().create(validated_data)

    def update(self, instance, validated_data):
        address = validated_data.pop('address')
        instance.address.address_1 = address.get('address_1', instance.address.address_1)
        instance.address.address_2 = address.get('address_2', instance.address.address_2)
        instance.address.zip = address.get('zip', instance.address.zip)
        instance.address.post_code = address.get('post_code', instance.address.post_code)
        instance.address.save()
        return super().update(instance, validated_data)


class CompanySerializer(AddressSerializerMixin, serializers.ModelSerializer):

    class Meta:
        model = Company
        fields = ('id', 'name', 'phone', 'address_1', 'address_2', 'zip', 'post_code')


class EmployeeSerializer(AddressSerializerMixin, serializers.ModelSerializer):

    class Meta:
        model = Employee
        fields = (
            'id',
            'first_name',
            'last_name',
            'email',
            'phone',
            'role',
            'company',
            'manager',
            'address_1',
            'address_2',
            'zip',
            'post_code',
        )

    def validate_company(self, value):
        if not value:
            raise serializers.ValidationError('This field may not be blank.')
        return value

    def validate_role(self, value):
        if value not in (1, 2):
            return serializers.ValidationError('This field may not be blank.')
        return value

    def to_representation(self, instance):
        rep = super().to_representation(instance)
        rep['company'] = getattr(instance.company, 'name', '')
        rep['manager'] = getattr(instance.manager, 'first_name', '')
        rep['address'] = getattr(instance.address, 'address_1', '')
        rep['role'] = instance.get_role_display()
        return rep
    

class ManagerChoices(serializers.Serializer):
    label = serializers.SerializerMethodField()
    value = serializers.IntegerField(source='id', read_only=True)

    def get_label(self, obj):
        return f'{obj.first_name} {obj.last_name}'

    def create(self, validated_data):
        pass

    def update(self, instance, validated_data):
        pass


class CompanyChoices(serializers.Serializer):
    label = serializers.CharField(source='name')
    value = serializers.IntegerField(source='id')

    def create(self, validated_data):
        pass

    def update(self, instance, validated_data):
        pass


class ManagerChangeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Employee
        fields = ('manager', )
        write_only_fields = ['manager']

    def validate_manager(self, value):
        if not value:
            raise serializers.ValidationError("This field many not be blank")
        return value
