from django.contrib import admin
from .models import Project, Team, Review, Document, ConferenceLink, PaperStatus

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'created_at', 'updated_at')
    search_fields = ('title', 'description')
    list_filter = ('created_at',)

@admin.register(Team)
class TeamAdmin(admin.ModelAdmin):
    list_display = ('name', 'project', 'mentor', 'coordinator', 'created_at')
    search_fields = ('name', 'project__title', 'student1__username', 'student2__username')
    list_filter = ('created_at', 'mentor', 'coordinator')
    raw_id_fields = ('student1', 'student2', 'mentor', 'coordinator', 'project')

@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ('team', 'review_type', 'scheduled_date', 'completed', 'created_at')
    search_fields = ('team__name', 'feedback')
    list_filter = ('review_type', 'completed', 'scheduled_date')
    raw_id_fields = ('team',)

@admin.register(Document)
class DocumentAdmin(admin.ModelAdmin):
    list_display = ('document_type', 'team', 'uploaded_at', 'updated_at')
    search_fields = ('team__name',)
    list_filter = ('document_type', 'uploaded_at')
    raw_id_fields = ('team',)

@admin.register(ConferenceLink)
class ConferenceLinkAdmin(admin.ModelAdmin):
    list_display = ('title', 'mentor', 'created_at')
    search_fields = ('title', 'description', 'url')
    list_filter = ('created_at', 'mentor')
    raw_id_fields = ('mentor',)

@admin.register(PaperStatus)
class PaperStatusAdmin(admin.ModelAdmin):
    list_display = ('team', 'status', 'updated_by', 'created_at', 'updated_at')
    search_fields = ('team__name',)
    list_filter = ('status', 'created_at')
    raw_id_fields = ('team', 'updated_by')
