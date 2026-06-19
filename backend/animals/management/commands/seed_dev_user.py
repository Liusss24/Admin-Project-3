from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand

DEV_USERNAME = 'admin'
DEV_PASSWORD = 'pgat2026'


class Command(BaseCommand):
    help = 'Creates the default demo user for development if it does not exist.'

    def handle(self, *args, **options):
        User = get_user_model()
        if User.objects.filter(username=DEV_USERNAME).exists():
            self.stdout.write(
                self.style.WARNING(f'User "{DEV_USERNAME}" already exists — skipping.')
            )
            return
        User.objects.create_superuser(username=DEV_USERNAME, password=DEV_PASSWORD)
        self.stdout.write(
            self.style.SUCCESS(
                f'Demo user created — username: "{DEV_USERNAME}", password: "{DEV_PASSWORD}"'
            )
        )
