from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Note, Exam, PYQ

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=6)

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            password=validated_data['password']
        )
        return user


class NoteSerializer(serializers.ModelSerializer):
    author_username = serializers.ReadOnlyField(source='author.username')

    class Meta:
        model = Note
        fields = ('id', 'title', 'subject', 'content', 'author', 'author_username', 'created_at', 'updated_at')
        read_only_fields = ('id', 'author', 'created_at', 'updated_at')


class ExamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exam
        fields = '__all__'


class PYQSerializer(serializers.ModelSerializer):
    class Meta:
        model = PYQ
        fields = '__all__'
