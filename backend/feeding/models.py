from django.db import models
from animals.models import Animal


class FeedingRecord(models.Model):
    animal = models.ForeignKey(Animal, on_delete=models.CASCADE, related_name='feeding_records')
    date = models.DateField()
    food_type = models.CharField(max_length=100)
    quantity = models.CharField(max_length=50, blank=True)
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-date']

    def __str__(self):
        return f'{self.animal.name} - {self.food_type} ({self.date})'
