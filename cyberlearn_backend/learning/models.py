from django.db import models
from django.conf import settings
from django.core.validators import FileExtensionValidator

class Project(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

class Team(models.Model):
    name = models.CharField(max_length=255)
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='teams')
    student1 = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='team_as_student1')
    student2 = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='team_as_student2')
    mentor = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, related_name='mentored_teams')
    coordinator = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, related_name='coordinated_teams')
    github_link = models.URLField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.project.title}"

class Review(models.Model):
    class ReviewType(models.TextChoices):
        FIRST = 'FIRST', 'First Review'
        SECOND = 'SECOND', 'Second Review'
        THIRD = 'THIRD', 'Third Review'
        FINAL = 'FINAL', 'Final Review'

    team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='reviews')
    review_type = models.CharField(max_length=10, choices=ReviewType.choices)
    scheduled_date = models.DateTimeField()
    feedback = models.TextField(blank=True)
    presentation_link = models.URLField(blank=True)
    completed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ['team', 'review_type']

    def __str__(self):
        return f"{self.team.name} - {self.review_type} Review"

class Document(models.Model):
    class DocumentType(models.TextChoices):
        REVIEW_FORM = 'REVIEW_FORM', 'Review Form'
        PAPER_FORMAT = 'PAPER_FORMAT', 'Paper Format'
        REPORT_FORMAT = 'REPORT_FORMAT', 'Report Format'
        PRESENTATION_TEMPLATE = 'PRESENTATION_TEMPLATE', 'Presentation Template'
        PAPER = 'PAPER', 'Research Paper'
        REPORT = 'REPORT', 'Project Report'

    team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='documents', null=True, blank=True)
    document_type = models.CharField(max_length=30, choices=DocumentType.choices)
    file = models.FileField(
        upload_to='documents/',
        validators=[FileExtensionValidator(allowed_extensions=['pdf', 'doc', 'docx', 'xlsx', 'xls'])]
    )
    uploaded_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.get_document_type_display()} - {self.team.name if self.team else 'Template'}"

class ConferenceLink(models.Model):
    title = models.CharField(max_length=255)
    url = models.URLField()
    description = models.TextField(blank=True)
    mentor = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='shared_conferences')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class PaperStatus(models.Model):
    class Status(models.TextChoices):
        SUBMITTED = 'SUBMITTED', 'Submitted'
        APPROVED = 'APPROVED', 'Approved'
        PUBLISHED = 'PUBLISHED', 'Published'
        REJECTED = 'REJECTED', 'Rejected'

    team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='paper_statuses')
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.SUBMITTED)
    proof_screenshot = models.ImageField(upload_to='proof_screenshots/', null=True, blank=True)
    updated_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.team.name} - {self.status}"

    class Meta:
        verbose_name_plural = 'Paper statuses'
