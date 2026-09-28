from django.test import TestCase
from rest_framework.test import APIClient


class PatientAuthenticationTests(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_patient_list_requires_authentication(self):
        response = self.client.get("/api/patients/")
        self.assertEqual(response.status_code, 401)

    def test_patient_creation_requires_authentication(self):
        response = self.client.post("/api/patients/", {"first_name": "Ana", "last_name": "López"})
        self.assertEqual(response.status_code, 401)
