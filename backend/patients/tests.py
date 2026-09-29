from django.test import TestCase
from django.contrib.auth import get_user_model
from patients.models import Patient
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


class LoginAndPatientListTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        user_model = get_user_model()
        self.nutritionist = user_model.objects.create_user(username="nutricionista_demo", password="contrasena-local")
        other_nutritionist = user_model.objects.create_user(username="otro_nutricionista", password="contrasena-local")
        Patient.objects.create(first_name="Ana", last_name="López", nutritionist=self.nutritionist)
        Patient.objects.create(first_name="Beto", last_name="García", nutritionist=other_nutritionist)

    def test_login_and_list_only_own_patients(self):
        login = self.client.post("/api/auth/login/", {"username": "nutricionista_demo", "password": "contrasena-local"}, format="json")
        self.assertEqual(login.status_code, 200)
        self.assertEqual(login.data["username"], "nutricionista_demo")
        self.assertTrue(login.data["token"])

        self.client.credentials(HTTP_AUTHORIZATION=f"Token {login.data['token']}")
        response = self.client.get("/api/patients/")

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data[0]["first_name"], "Ana")
        self.assertEqual(len(response.data), 1)
