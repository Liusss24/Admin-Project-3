from django.db import models
from animals.models import Animal


class Farm(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class AnimalLocation(models.Model):
    animal = models.ForeignKey(Animal, on_delete=models.CASCADE, related_name='locations')
    farm = models.ForeignKey(Farm, on_delete=models.CASCADE, related_name='animals')
    lot = models.CharField(max_length=100)
    assigned_at = models.DateField()
    is_current = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-assigned_at']

    def __str__(self):
        return f'{self.animal.name} → {self.farm.name} / {self.lot}'
