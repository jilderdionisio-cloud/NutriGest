from django.contrib import admin
from django.urls import include, path
from accounts.views import LoginView

urlpatterns = [path("admin/", admin.site.urls), path("api/auth/login/", LoginView.as_view()), path("api/", include("patients.urls"))]
