from rest_framework.decorators import api_view, action
from rest_framework.generics import ListAPIView, UpdateAPIView
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from .serializers import CompanySerializer, EmployeeSerializer, ManagerChoices, CompanyChoices, \
    ManagerChangeSerializer
from ...models import Company, Employee


class CompanyViewSet(ModelViewSet):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer


class EmployeeList(ListAPIView):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        if self.kwargs.get('company'):
            qs = qs.filter(company_id=self.kwargs.get('company'))
        return qs


class EmployeeViewSet(ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer

    def retrieve(self, request, *args, **kwargs):
        response = super().retrieve(request, *args, **kwargs)
        obj = self.get_object()
        response.data.update(
            {'company': obj.company_id, 'manager': obj.manager_id, 'role': obj.role}
        )
        return response

    @action(detail=False, methods=['get'], url_path='company/(?P<company_id>\d+)')
    def get_company_employees(self, request, company_id, pk=None):
        qs = self.get_queryset().filter(company_id=company_id)
        serializer = self.get_serializer(qs, many=True)
        return Response(serializer.data)


@api_view(['GET'])
def role_choices(request):
    """Returns list of roles in pair of display value and database storage value"""
    choices = [
        {'label': 'Manager', 'value': 1},
        {'label': 'Employee', 'value': 2},
    ]
    return Response(choices)


class ManagerChoiceView(ListAPIView):
    serializer_class = ManagerChoices

    def get_queryset(self):
        qs = Employee.objects.all()
        id_ = self.kwargs.get('id')
        if id:
            qs = qs.exclude(id=id_)
        return qs


class CompanyChoiceView(ListAPIView):
    queryset = Company.objects.all()
    serializer_class = CompanyChoices


class ManagerChangeView(UpdateAPIView):
    queryset = Employee.objects.all()
    serializer_class = ManagerChangeSerializer
