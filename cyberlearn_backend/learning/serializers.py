from rest_framework import serializers
from .models import Project, Team, Review, Document, ConferenceLink, PaperStatus
from django.contrib.auth import get_user_model

User = get_user_model()

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'

class TeamSerializer(serializers.ModelSerializer):
    student1_details = serializers.SerializerMethodField()
    student2_details = serializers.SerializerMethodField()
    mentor_details = serializers.SerializerMethodField()
    coordinator_details = serializers.SerializerMethodField()
    project_title = serializers.CharField(source='project.title', read_only=True)

    class Meta:
        model = Team
        fields = '__all__'

    def get_student1_details(self, obj):
        return {'id': obj.student1.id, 'username': obj.student1.username, 'email': obj.student1.email}

    def get_student2_details(self, obj):
        return {'id': obj.student2.id, 'username': obj.student2.username, 'email': obj.student2.email}

    def get_mentor_details(self, obj):
        if obj.mentor:
            return {'id': obj.mentor.id, 'username': obj.mentor.username, 'email': obj.mentor.email}
        return None

    def get_coordinator_details(self, obj):
        if obj.coordinator:
            return {'id': obj.coordinator.id, 'username': obj.coordinator.username, 'email': obj.coordinator.email}
        return None

class ReviewSerializer(serializers.ModelSerializer):
    team_name = serializers.CharField(source='team.name', read_only=True)

    class Meta:
        model = Review
        fields = '__all__'

class DocumentSerializer(serializers.ModelSerializer):
    team_name = serializers.CharField(source='team.name', read_only=True)
    document_type_display = serializers.CharField(source='get_document_type_display', read_only=True)

    class Meta:
        model = Document
        fields = '__all__'

class ConferenceLinkSerializer(serializers.ModelSerializer):
    mentor_name = serializers.CharField(source='mentor.username', read_only=True)

    class Meta:
        model = ConferenceLink
        fields = '__all__'

class PaperStatusSerializer(serializers.ModelSerializer):
    team_name = serializers.CharField(source='team.name', read_only=True)
    status_display = serializers.CharField(source='get_status_display', read_only=True)
    updated_by_name = serializers.CharField(source='updated_by.username', read_only=True)

    class Meta:
        model = PaperStatus
        fields = '__all__'

class ProjectUploadSerializer(serializers.Serializer):
    excel_file = serializers.FileField()

    def validate_excel_file(self, value):
        if not value.name.endswith(('.xlsx', '.xls')):
            raise serializers.ValidationError("Only Excel files are allowed.")
        return value

class TeamAssignmentSerializer(serializers.Serializer):
    project_id = serializers.IntegerField()
    student1_id = serializers.IntegerField()
    student2_id = serializers.IntegerField()

    def validate(self, data):
        if data['student1_id'] == data['student2_id']:
            raise serializers.ValidationError("Students must be different.")
        return data

class ReviewScheduleSerializer(serializers.Serializer):
    team_id = serializers.IntegerField()
    review_type = serializers.ChoiceField(choices=Review.ReviewType.choices)
    scheduled_date = serializers.DateTimeField()

class DocumentUploadSerializer(serializers.Serializer):
    document_type = serializers.ChoiceField(choices=Document.DocumentType.choices)
    file = serializers.FileField()

    def validate_file(self, value):
        allowed_extensions = ['pdf', 'doc', 'docx', 'xlsx', 'xls']
        ext = value.name.split('.')[-1].lower()
        if ext not in allowed_extensions:
            raise serializers.ValidationError(f"Only {', '.join(allowed_extensions)} files are allowed.")
        return value
