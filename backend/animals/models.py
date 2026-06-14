from django.db import models


class Animal(models.Model):
    class Category(models.TextChoices):
        TRABAJO = 'trabajo', 'Trabajo'
        PRODUCCION = 'produccion', 'Producción'
        CONSUMO = 'consumo', 'Consumo'

    name = models.CharField(max_length=100)
    identifier = models.CharField(max_length=50, unique=True)
    category = models.CharField(max_length=20, choices=Category.choices)
    species = models.CharField(max_length=50)
    birth_date = models.DateField(null=True, blank=True)
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return f'{self.name} ({self.identifier})'
