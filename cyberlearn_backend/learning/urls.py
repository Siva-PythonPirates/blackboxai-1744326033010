from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import ProjectViewSet, TeamViewSet, ReviewViewSet, DocumentViewSet, ConferenceLinkViewSet, PaperStatusViewSet

router = DefaultRouter()
router.register(r'projects', ProjectViewSet, basename='project')
router.register(r'teams', TeamViewSet, basename='team')
router.register(r'reviews', ReviewViewSet, basename='review')
router.register(r'documents', DocumentViewSet, basename='document')
router.register(r'conference-links', ConferenceLinkViewSet, basename='conference-link')
router.register(r'paper-statuses', PaperStatusViewSet, basename='paper-status')

urlpatterns = router.urls
