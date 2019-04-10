from django.contrib import admin

from .models import Company, Address, Employee

admin.site.register([Company, Address, Employee])
