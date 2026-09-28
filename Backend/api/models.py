from django.db import models
from django.contrib.auth.models import User

class Note(models.Model):
    title = models.CharField(max_length=200)
    subject = models.CharField(max_length=100)
    content = models.TextField()
    author = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='notes')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title


class Exam(models.Model):
    title = models.CharField(max_length=200)
    subject = models.CharField(max_length=100)
    exam_date = models.CharField(max_length=100)
    duration = models.CharField(max_length=50, default="3 hours")
    room = models.CharField(max_length=50, default="Hall A")
    description = models.TextField(blank=True, default="")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['exam_date']

    def __str__(self):
        return f"{self.subject} - {self.title}"


class PYQ(models.Model):
    title = models.CharField(max_length=255)
    subject = models.CharField(max_length=150)
    branch = models.CharField(max_length=100, default="Computer Science & Engineering")
    academic_year = models.CharField(max_length=50, default="1st Year")
    semester = models.IntegerField(default=1)
    exam_year = models.IntegerField(default=2024)
    session = models.CharField(max_length=50, blank=True, default="")
    url = models.URLField(max_length=500, blank=True, default="")
    paper_code = models.CharField(max_length=50, blank=True, default="")
    description = models.TextField(blank=True, default="")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['semester', '-exam_year', 'subject']

    def __str__(self):
        return f"{self.subject} - Sem {self.semester} ({self.exam_year})"
