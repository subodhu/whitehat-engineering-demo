from django.urls import path, include
from rest_framework import routers

from .views import CompanyViewSet, role_choices, CompanyChoiceView, ManagerChoiceView, ManagerChangeView, \
    EmployeeViewSet

app_name = 'company_api_v1'

router = routers.SimpleRouter()
router.register(r'company', CompanyViewSet)
router.register(r'employee', EmployeeViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('role-choices/', role_choices),
    path('manager-choices/', ManagerChoiceView.as_view()),
    path('manager-choices/<int:id>/', ManagerChoiceView.as_view()),
    path('company-choices/', CompanyChoiceView.as_view()),
    path('change-manager/<pk>/', ManagerChangeView.as_view()),
]
