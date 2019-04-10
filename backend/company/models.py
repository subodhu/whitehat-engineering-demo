from django.db import models
from django.utils.translation import ugettext_lazy as _


class Company(models.Model):
    name = models.CharField(_('name'), max_length=100)
    phone = models.CharField(_('phone'), max_length=12)
    address = models.ForeignKey(
        'Address',
        related_name='company',
        null=True,
        on_delete=models.SET_NULL
    )

    def __str__(self):
        return self.name


class Address(models.Model):
    address_1 = models.CharField(_('address one'), max_length=255)
    address_2 = models.CharField(_('address two'), max_length=255, blank=True)
    zip = models.CharField(_('zip'), max_length=12)
    post_code = models.CharField(_('post code'), max_length=12)

    def __str__(self):
        return self.address_1


class Employee(models.Model):
    MANAGER, EMPLOYEE = 1, 2
    ROLE_CHOICES = (
        (MANAGER, 'Manager'),
        (EMPLOYEE, 'Employee'),
    )

    first_name = models.CharField(_('first name'), max_length=100)
    last_name = models.CharField(_('last name'), max_length=100)
    email = models.EmailField(_('email'))
    phone = models.CharField(_('phone'), max_length=12)
    role = models.IntegerField(_('role'), choices=ROLE_CHOICES)
    company = models.ForeignKey(Company, related_name='employee', on_delete=models.CASCADE)
    manager = models.ForeignKey(
        'self',
        related_name='employees',
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
    )
    address = models.ForeignKey(
        Address,
        related_name='employee',
        null=True,
        on_delete=models.SET_NULL,
    )

    def __str__(self):
        return f'{self.first_name} {self.last_name}'
