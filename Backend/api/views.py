from django.shortcuts import render
from django.http import HttpResponse
from django.db import connection
from django.db.models import Q
from django.utils import timezone
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from .models import Note, Exam, PYQ
from .serializers import RegisterSerializer, NoteSerializer, ExamSerializer, PYQSerializer


def home(request):
    return HttpResponse('Django Backend is running smoothly!')


class HealthCheckView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        db_status = "connected"
        try:
            connection.ensure_connection()
        except Exception as e:
            db_status = f"error: {str(e)}"

        return Response({
            "status": "ok",
            "message": "Django REST Backend is online and connected.",
            "database": db_status,
            "timestamp": timezone.now().isoformat(),
            "counts": {
                "notes": Note.objects.count(),
                "exams": Exam.objects.count(),
                "pyqs": PYQ.objects.count(),
            }
        })


class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "User registered successfully!"},
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({
            "id": request.user.id,
            "username": request.user.username,
            "email": request.user.email,
            "date_joined": request.user.date_joined,
        })


class NoteListCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        notes = Note.objects.all()
        serializer = NoteSerializer(notes, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = NoteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(author=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ExamListView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        exams = Exam.objects.all()
        serializer = ExamSerializer(exams, many=True)
        return Response(serializer.data)


class PYQListView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        queryset = PYQ.objects.all()

        semester = request.query_params.get('semester')
        if semester:
            queryset = queryset.filter(semester=semester)

        academic_year = request.query_params.get('academic_year')
        if academic_year:
            queryset = queryset.filter(academic_year=academic_year)

        branch = request.query_params.get('branch')
        if branch:
            queryset = queryset.filter(branch=branch)

        exam_year = request.query_params.get('exam_year')
        if exam_year:
            queryset = queryset.filter(exam_year=exam_year)

        search = request.query_params.get('search')
        if search:
            queryset = queryset.filter(
                Q(title__icontains=search) |
                Q(subject__icontains=search) |
                Q(paper_code__icontains=search) |
                Q(session__icontains=search)
            )

        serializer = PYQSerializer(queryset, many=True)
        return Response(serializer.data)


from .study_helper import (
    detect_subject_from_filename,
    generate_mark_based_answer,
    SUBJECT_QUESTION_BANKS,
)


class HelperUploadView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        uploaded_file = request.FILES.get('pdf')
        filename = request.data.get('filename', '')

        if uploaded_file:
            filename = uploaded_file.name

        if not filename:
            return Response({"error": "No PDF file or filename provided"}, status=status.HTTP_400_BAD_REQUEST)

        subject_key = detect_subject_from_filename(filename)
        bank = SUBJECT_QUESTION_BANKS.get(subject_key, SUBJECT_QUESTION_BANKS["computer_programming_in_c"])

        question_summary = []
        for q in bank.get("questions", []):
            question_summary.append({
                "id": q["id"],
                "number": q["number"],
                "title": q["title"],
                "marks": q["marks"],
            })

        greeting = (
            f"Hello! I have analyzed your question paper for **{bank['subject']}**.\n\n"
            f"I have detected **{len(question_summary)} question sections** carrying up to **{bank['total_marks']} marks**.\n\n"
            "**In which format do you need the answer to these questions?**\n"
            "1. **Long Format:** Detailed 10-15 lines per 6-mark question, structured strictly by marking criteria (Syntax, Rules, Working Code & Examples).\n"
            "2. **Short & Crisp Format:** Concise key points and definitions for rapid revision.\n\n"
            "You can choose a format below or ask me to solve any specific question!"
        )

        return Response({
            "status": "success",
            "filename": filename,
            "subject": bank["subject"],
            "subject_key": subject_key,
            "semester": bank["semester"],
            "total_marks": bank["total_marks"],
            "questions": question_summary,
            "bot_message": greeting,
        })


class HelperChatView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        query = request.data.get("query", "").strip()
        format_type = request.data.get("format_type", "long")
        subject_key = request.data.get("subject_key", "computer_programming_in_c")

        if not query:
            return Response({"error": "Query cannot be empty"}, status=status.HTTP_400_BAD_REQUEST)

        reply = generate_mark_based_answer(query, subject_key=subject_key, format_type=format_type)

        return Response({
            "query": query,
            "reply": reply,
            "subject_key": subject_key,
            "format_type": format_type,
            "timestamp": timezone.now().isoformat()
        })