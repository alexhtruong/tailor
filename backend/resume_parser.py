# Description: This file will be used to parse the job description that the user inputs
from pypdf import PdfReader
from docx import Document
import os
from io import BytesIO

# TODO: save resume into a database using resume.save('uploads/')... etc
# parameters: resume must be a valid file path
# example usage: resume_text_traction('path/to/resume')
# in this case it will be a POST file
"""
    The function `resumeTextExtraction` extracts text content from PDF and DOCX files provided as input
    resumes.
    
    :param resume: The `resumeTextExtraction` function is designed to extract text content from a resume
    file. It first checks the file extension of the resume file to determine the format (PDF or DOCX).
    If the file is a PDF, it uses PyPDF2 to extract text from each page. If the
    :return: The `resumeTextExtraction` function returns the extracted text content from the provided
    resume file. If the file extension is '.pdf', it extracts text from each page of the PDF using
    PyPDF2 library. If the file extension is '.docx', it extracts text from paragraphs in the Word
    document using python-docx library. If the file format is not supported, it raises a ValueError.
"""
def resumeTextExtraction(resume):
    
    file_extension = os.path.splitext(resume.filename)[1].lower()

    if file_extension == '.pdf':
        reader = PdfReader(resume.stream)
        resume_pages = [page for page in reader.pages]
        resume_text = ""
        for page in resume_pages:
            resume_text += page.extract_text()
        
        return resume_text
    elif file_extension == '.docx':
        doc_bytes = BytesIO(resume.read())
        doc = Document(doc_bytes) 
        resume_text = ""
        for paragraph in doc.paragraphs:
            resume_text += paragraph.text + "\n"
        return resume_text
    elif file_extension == '.txt':
        resume_text = resume.stream.read().decode('utf-8')
        return resume_text
    else:
        raise ValueError('Unsupported file format')