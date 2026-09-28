from rest_framework import generics
from .models import Patient
from .serializers import PatientSerializer


class PatientListCreateView(generics.ListCreateAPIView):
    serializer_class = PatientSerializer

    def get_queryset(self):
        return Patient.objects.filter(nutritionist=self.request.user)

    def perform_create(self, serializer):
        serializer.save(nutritionist=self.request.user)


class PatientDetailView(generics.RetrieveUpdateAPIView):
    serializer_class = PatientSerializer

    def get_queryset(self):
        return Patient.objects.filter(nutritionist=self.request.user)
