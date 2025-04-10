from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    class Role(models.TextChoices):
        ADMIN = 'ADMIN', 'Admin'
        COORDINATOR = 'COORDINATOR', 'Coordinator'
        MENTOR = 'MENTOR', 'Mentor'
        STUDENT = 'STUDENT', 'Student'

    role = models.CharField(
        max_length=20,
        choices=Role.choices,
        default=Role.STUDENT
    )
    email = models.EmailField(unique=True)

    def __str__(self):
        return f"{self.username} - {self.role}"

    class Meta:
        ordering = ['username']
