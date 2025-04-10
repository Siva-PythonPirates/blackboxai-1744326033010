from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import get_user_model
from .serializers import UserSerializer, UserDetailSerializer

User = get_user_model()

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (permissions.AllowAny,)
    serializer_class = UserSerializer

class UserDetailView(generics.RetrieveUpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserDetailSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_object(self):
        return self.request.user

class UserListView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserDetailSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        role = self.request.query_params.get('role', None)
        queryset = User.objects.all()
        if role:
            queryset = queryset.filter(role=role)
        return queryset

class RoleCheckView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request):
        user = request.user
        return Response({
            'role': user.role,
            'is_admin': user.role == User.Role.ADMIN,
            'is_coordinator': user.role == User.Role.COORDINATOR,
            'is_mentor': user.role == User.Role.MENTOR,
            'is_student': user.role == User.Role.STUDENT,
        })
