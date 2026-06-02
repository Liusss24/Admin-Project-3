from django.db import models
from animals.models import Animal


class HealthEvent(models.Model):
    class EventType(models.TextChoices):
        VACUNACION = 'vacunacion', 'Vacunación'
        DESPARASITACION = 'desparasitacion', 'Desparasitación'
        REVISION = 'revision', 'Revisión'
        OTRO = 'otro', 'Otro'

    animal = models.ForeignKey(Animal, on_delete=models.CASCADE, related_name='health_events')
    event_type = models.CharField(max_length=20, choices=EventType.choices)
    date = models.DateField()
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-date']

    def __str__(self):
        return f'{self.get_event_type_display()} - {self.animal.name} ({self.date})'
