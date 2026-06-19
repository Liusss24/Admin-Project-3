from django.core.management.base import BaseCommand
from django.db import transaction

from animals.models import Animal
from health.models import HealthEvent
from feeding.models import FeedingRecord
from location.models import Farm, AnimalLocation


FARMS = [
    {
        'name': 'Finca El Roble',
        'description': 'Finca principal, especializada en ganado bovino lechero.',
    },
    {
        'name': 'Potrero Norte',
        'description': 'Área de pastoreo para animales de trabajo y equinos.',
    },
    {
        'name': 'Granja Sur',
        'description': 'Unidad de producción y consumo, incluye cerdos y ovejas.',
    },
]

ANIMALS = [
    {
        'name': 'Lucero',
        'identifier': 'BOV-001',
        'category': Animal.Category.PRODUCCION,
        'species': 'Vaca',
        'birth_date': '2019-03-15',
        'notes': 'Buena productora de leche, carácter tranquilo.',
    },
    {
        'name': 'Trueno',
        'identifier': 'EQU-001',
        'category': Animal.Category.TRABAJO,
        'species': 'Caballo',
        'birth_date': '2017-06-20',
        'notes': 'Usado para labores de campo y transporte.',
    },
    {
        'name': 'Manchas',
        'identifier': 'POR-001',
        'category': Animal.Category.CONSUMO,
        'species': 'Cerdo',
        'birth_date': '2022-11-08',
        'notes': '',
    },
    {
        'name': 'Paloma',
        'identifier': 'EQU-002',
        'category': Animal.Category.TRABAJO,
        'species': 'Yegua',
        'birth_date': '2018-09-12',
        'notes': 'Mansa y confiable para recorridos largos.',
    },
    {
        'name': 'Canela',
        'identifier': 'BOV-002',
        'category': Animal.Category.PRODUCCION,
        'species': 'Vaca',
        'birth_date': '2020-04-01',
        'notes': 'Alta producción durante temporada lluviosa.',
    },
    {
        'name': 'Negro',
        'identifier': 'BOV-003',
        'category': Animal.Category.CONSUMO,
        'species': 'Toro',
        'birth_date': '2021-07-19',
        'notes': '',
    },
    {
        'name': 'Estrella',
        'identifier': 'CAP-001',
        'category': Animal.Category.PRODUCCION,
        'species': 'Cabra',
        'birth_date': '2021-01-25',
        'notes': 'Productora de leche para consumo familiar.',
    },
    {
        'name': 'Copito',
        'identifier': 'OVI-001',
        'category': Animal.Category.CONSUMO,
        'species': 'Oveja',
        'birth_date': '2022-03-10',
        'notes': '',
    },
    {
        'name': 'Relampago',
        'identifier': 'EQU-003',
        'category': Animal.Category.TRABAJO,
        'species': 'Caballo',
        'birth_date': '2016-12-05',
        'notes': 'Más activo por las mañanas. Requiere ejercicio diario.',
    },
    {
        'name': 'Rosa',
        'identifier': 'BOV-004',
        'category': Animal.Category.PRODUCCION,
        'species': 'Vaca',
        'birth_date': '2020-08-14',
        'notes': '',
    },
]

# (identifier, farm_name, lot, assigned_at)
LOCATIONS = [
    ('BOV-001', 'Finca El Roble', 'Lote A', '2024-01-10'),
    ('EQU-001', 'Potrero Norte', 'Lote B', '2024-02-05'),
    ('POR-001', 'Granja Sur', 'Corral 1', '2024-01-20'),
    ('EQU-002', 'Potrero Norte', 'Lote A', '2024-03-01'),
    ('BOV-002', 'Finca El Roble', 'Lote A', '2024-01-10'),
    ('BOV-003', 'Granja Sur', 'Corral 2', '2024-02-15'),
    ('CAP-001', 'Finca El Roble', 'Lote B', '2024-01-15'),
    ('OVI-001', 'Granja Sur', 'Corral 1', '2024-03-05'),
    ('EQU-003', 'Potrero Norte', 'Lote C', '2024-02-20'),
    ('BOV-004', 'Finca El Roble', 'Lote A', '2024-01-10'),
]

# (identifier, event_type, date, description)
HEALTH_EVENTS = [
    ('BOV-001', HealthEvent.EventType.VACUNACION, '2024-02-10', 'Vacuna aftosa dosis anual.'),
    ('BOV-001', HealthEvent.EventType.DESPARASITACION, '2024-03-20', 'Desparasitación interna con ivermectina.'),
    ('BOV-001', HealthEvent.EventType.REVISION, '2024-05-05', 'Control de peso y estado general. Sin novedades.'),
    ('EQU-001', HealthEvent.EventType.VACUNACION, '2024-01-15', 'Vacuna influenza equina.'),
    ('EQU-001', HealthEvent.EventType.DESPARASITACION, '2024-04-10', 'Desparasitación con fenbendazol.'),
    ('EQU-001', HealthEvent.EventType.REVISION, '2024-06-01', 'Revisión de cascos y estado dental.'),
    ('BOV-002', HealthEvent.EventType.VACUNACION, '2024-02-10', 'Vacuna aftosa dosis anual.'),
    ('BOV-002', HealthEvent.EventType.REVISION, '2024-04-22', 'Control de producción de leche. Resultado satisfactorio.'),
    ('EQU-002', HealthEvent.EventType.VACUNACION, '2024-01-15', 'Vacuna influenza equina.'),
    ('EQU-002', HealthEvent.EventType.DESPARASITACION, '2024-04-10', 'Desparasitación semestral.'),
    ('CAP-001', HealthEvent.EventType.REVISION, '2024-03-08', 'Revisión posparto. Buen estado de salud.'),
    ('CAP-001', HealthEvent.EventType.VACUNACION, '2024-05-20', 'Vacuna enterotoxemia.'),
    ('POR-001', HealthEvent.EventType.DESPARASITACION, '2024-02-28', 'Desparasitación con doramectina.'),
    ('POR-001', HealthEvent.EventType.REVISION, '2024-04-15', 'Revisión de peso y condición corporal.'),
    ('EQU-003', HealthEvent.EventType.VACUNACION, '2024-01-15', 'Vacuna influenza equina y tétano.'),
    ('EQU-003', HealthEvent.EventType.OTRO, '2024-03-30', 'Tratamiento antiinflamatorio por lesión en pata delantera.'),
    ('BOV-004', HealthEvent.EventType.VACUNACION, '2024-02-10', 'Vacuna aftosa dosis anual.'),
    ('OVI-001', HealthEvent.EventType.DESPARASITACION, '2024-03-05', 'Desparasitación interna preventiva.'),
]

# (identifier, date, food_type, quantity, notes)
FEEDING_RECORDS = [
    ('BOV-001', '2026-06-01', 'Heno', '15 kg', ''),
    ('BOV-001', '2026-06-08', 'Concentrado lechero', '5 kg', 'Suplemento proteico.'),
    ('BOV-001', '2026-06-15', 'Pasto estrella', '', 'Pastoreo libre durante 6 horas.'),
    ('BOV-001', '2026-06-19', 'Heno', '15 kg', ''),
    ('EQU-001', '2026-06-02', 'Heno de alfalfa', '8 kg', ''),
    ('EQU-001', '2026-06-09', 'Concentrado equino', '3 kg', 'Previo a jornada de trabajo.'),
    ('EQU-001', '2026-06-16', 'Heno de alfalfa', '8 kg', ''),
    ('BOV-002', '2026-06-03', 'Concentrado lechero', '6 kg', ''),
    ('BOV-002', '2026-06-10', 'Heno', '12 kg', ''),
    ('BOV-002', '2026-06-17', 'Pasto kikuyo', '', 'Pastoreo en lote A.'),
    ('POR-001', '2026-06-04', 'Maíz molido', '2 kg', ''),
    ('POR-001', '2026-06-11', 'Concentrado porcino', '2.5 kg', 'Mezcla con suero de leche.'),
    ('POR-001', '2026-06-18', 'Maíz molido', '2 kg', ''),
    ('EQU-002', '2026-06-02', 'Heno de alfalfa', '7 kg', ''),
    ('EQU-002', '2026-06-09', 'Concentrado equino', '2.5 kg', ''),
    ('CAP-001', '2026-06-05', 'Pasto kikuyo', '', 'Pastoreo libre.'),
    ('CAP-001', '2026-06-12', 'Concentrado caprino', '1 kg', 'Suplemento para lactancia.'),
    ('OVI-001', '2026-06-06', 'Heno', '3 kg', ''),
    ('OVI-001', '2026-06-13', 'Pasto estrella', '', ''),
    ('EQU-003', '2026-06-02', 'Heno de alfalfa', '9 kg', ''),
    ('EQU-003', '2026-06-09', 'Concentrado equino', '3.5 kg', 'Ración aumentada por alta carga de trabajo.'),
    ('BOV-004', '2026-06-01', 'Pasto kikuyo', '', 'Pastoreo rotacional.'),
    ('BOV-004', '2026-06-08', 'Concentrado lechero', '5 kg', ''),
    ('BOV-003', '2026-06-07', 'Maíz molido', '4 kg', ''),
    ('BOV-003', '2026-06-14', 'Concentrado bovino engorde', '3 kg', ''),
]


class Command(BaseCommand):
    help = 'Populates the database with sample farms, animals, health events and feeding records.'

    @transaction.atomic
    def handle(self, *args, **options):
        farms = self._seed_farms()
        animals = self._seed_animals()
        self._seed_locations(animals, farms)
        self._seed_health_events(animals)
        self._seed_feeding_records(animals)
        self.stdout.write(self.style.SUCCESS('Demo data loaded successfully.'))

    def _seed_farms(self):
        farms = {}
        for data in FARMS:
            farm, created = Farm.objects.get_or_create(
                name=data['name'],
                defaults={'description': data['description']},
            )
            farms[farm.name] = farm
            if created:
                self.stdout.write(f'  Farm created: {farm.name}')
        return farms

    def _seed_animals(self):
        animals = {}
        for data in ANIMALS:
            animal, created = Animal.objects.get_or_create(
                identifier=data['identifier'],
                defaults={
                    'name': data['name'],
                    'category': data['category'],
                    'species': data['species'],
                    'birth_date': data['birth_date'] or None,
                    'notes': data['notes'],
                },
            )
            animals[animal.identifier] = animal
            if created:
                self.stdout.write(f'  Animal created: {animal.name} ({animal.identifier})')
        return animals

    def _seed_locations(self, animals, farms):
        for identifier, farm_name, lot, assigned_at in LOCATIONS:
            animal = animals.get(identifier)
            farm = farms.get(farm_name)
            if not animal or not farm:
                continue
            exists = AnimalLocation.objects.filter(animal=animal, farm=farm, lot=lot).exists()
            if not exists:
                AnimalLocation.objects.filter(animal=animal, is_current=True).update(is_current=False)
                AnimalLocation.objects.create(
                    animal=animal,
                    farm=farm,
                    lot=lot,
                    assigned_at=assigned_at,
                    is_current=True,
                )

    def _seed_health_events(self, animals):
        for identifier, event_type, date, description in HEALTH_EVENTS:
            animal = animals.get(identifier)
            if not animal:
                continue
            exists = HealthEvent.objects.filter(
                animal=animal, event_type=event_type, date=date
            ).exists()
            if not exists:
                HealthEvent.objects.create(
                    animal=animal,
                    event_type=event_type,
                    date=date,
                    description=description,
                )

    def _seed_feeding_records(self, animals):
        for identifier, date, food_type, quantity, notes in FEEDING_RECORDS:
            animal = animals.get(identifier)
            if not animal:
                continue
            exists = FeedingRecord.objects.filter(
                animal=animal, date=date, food_type=food_type
            ).exists()
            if not exists:
                FeedingRecord.objects.create(
                    animal=animal,
                    date=date,
                    food_type=food_type,
                    quantity=quantity,
                    notes=notes,
                )
