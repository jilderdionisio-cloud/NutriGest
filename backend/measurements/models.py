from django.db import models
from patients.models import Patient


class Measurement(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name="measurements")
    recorded_at = models.DateTimeField()
    weight_kg = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    height_cm = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    waist_cm = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-recorded_at"]
