from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.parsers import MultiPartParser, FormParser
from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
import pandas as pd
import random
from .models import Project, Team, Review, Document, ConferenceLink, PaperStatus
from .serializers import (
    ProjectSerializer, TeamSerializer, ReviewSerializer, DocumentSerializer,
    ConferenceLinkSerializer, PaperStatusSerializer, ProjectUploadSerializer,
    TeamAssignmentSerializer, ReviewScheduleSerializer, DocumentUploadSerializer
)

User = get_user_model()

class IsAdminUser(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.role == User.Role.ADMIN

class IsCoordinatorUser(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.role == User.Role.COORDINATOR

class IsMentorUser(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.role == User.Role.MENTOR

class IsStudentUser(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.role == User.Role.STUDENT

class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [permissions.IsAuthenticated]

    @action(detail=False, methods=['post'], permission_classes=[IsAdminUser])
    def upload_projects(self, request):
        serializer = ProjectUploadSerializer(data=request.data)
        if serializer.is_valid():
            excel_file = request.FILES['excel_file']
            try:
                df = pd.read_excel(excel_file)
                for _, row in df.iterrows():
                    Project.objects.create(
                        title=row['title'],
                        description=row.get('description', '')
                    )
                return Response({'message': 'Projects uploaded successfully'})
            except Exception as e:
                return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TeamViewSet(viewsets.ModelViewSet):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer
    permission_classes = [permissions.IsAuthenticated]

    @action(detail=False, methods=['post'], permission_classes=[IsAdminUser])
    def assign_team(self, request):
        serializer = TeamAssignmentSerializer(data=request.data)
        if serializer.is_valid():
            # Get available coordinators and mentors
            coordinators = User.objects.filter(role=User.Role.COORDINATOR)
            mentors = User.objects.filter(role=User.Role.MENTOR)
            
            if not coordinators.exists() or not mentors.exists():
                return Response(
                    {'error': 'No available coordinators or mentors'},
                    status=status.HTTP_400_BAD_REQUEST
                )

            # Randomly assign coordinator and mentor
            coordinator = random.choice(coordinators)
            mentor = random.choice(mentors)

            team = Team.objects.create(
                project_id=serializer.validated_data['project_id'],
                student1_id=serializer.validated_data['student1_id'],
                student2_id=serializer.validated_data['student2_id'],
                coordinator=coordinator,
                mentor=mentor
            )
            return Response(TeamSerializer(team).data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [permissions.IsAuthenticated]

    @action(detail=False, methods=['post'], permission_classes=[IsAdminUser])
    def schedule_review(self, request):
        serializer = ReviewScheduleSerializer(data=request.data)
        if serializer.is_valid():
            review = Review.objects.create(**serializer.validated_data)
            return Response(ReviewSerializer(review).data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['post'], permission_classes=[IsCoordinatorUser | IsMentorUser])
    def submit_feedback(self, request, pk=None):
        review = self.get_object()
        review.feedback = request.data.get('feedback', '')
        review.completed = True
        review.save()
        return Response(ReviewSerializer(review).data)

class DocumentViewSet(viewsets.ModelViewSet):
    queryset = Document.objects.all()
    serializer_class = DocumentSerializer
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = (MultiPartParser, FormParser)

    @action(detail=False, methods=['post'], permission_classes=[IsAdminUser])
    def upload_template(self, request):
        serializer = DocumentUploadSerializer(data=request.data)
        if serializer.is_valid():
            document = Document.objects.create(
                document_type=serializer.validated_data['document_type'],
                file=serializer.validated_data['file']
            )
            return Response(DocumentSerializer(document).data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ConferenceLinkViewSet(viewsets.ModelViewSet):
    queryset = ConferenceLink.objects.all()
    serializer_class = ConferenceLinkSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(mentor=self.request.user)

class PaperStatusViewSet(viewsets.ModelViewSet):
    queryset = PaperStatus.objects.all()
    serializer_class = PaperStatusSerializer
    permission_classes = [permissions.IsAuthenticated]

    @action(detail=True, methods=['post'], permission_classes=[IsCoordinatorUser])
    def update_status(self, request, pk=None):
        paper_status = self.get_object()
        paper_status.status = request.data.get('status')
        paper_status.updated_by = request.user
        paper_status.save()
        return Response(PaperStatusSerializer(paper_status).data)

    @action(detail=False, methods=['post'], permission_classes=[IsStudentUser])
    def request_status_update(self, request):
        team = get_object_or_404(Team, student1=request.user) | get_object_or_404(Team, student2=request.user)
        paper_status = PaperStatus.objects.create(
            team=team,
            status=PaperStatus.Status.SUBMITTED,
            proof_screenshot=request.data.get('proof_screenshot')
        )
        return Response(PaperStatusSerializer(paper_status).data)
