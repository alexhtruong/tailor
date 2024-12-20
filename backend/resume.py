# resume parsing 
from pypdf import PdfReader
from docx import Document
import os
from io import BytesIO
import re

# openai
from dotenv import load_dotenv
from openai import AsyncOpenAI

load_dotenv()

# Get the API key from the .env file
try:
    openai_api_key = os.getenv("OPENAI_API_KEY")
    if not openai_api_key:
        raise ValueError("OPENAI_API_KEY not found or is not set.")
except Exception as e:
    print(f"Error: {e}")
    raise

# Initialize the OpenAI API client
client = AsyncOpenAI()

# TODO: async maybe not necessary here?
async def getResumeFeedback(job_description, resume_text):
    """
    Generates feedback for a resume based on a job description using an AI model.

    Parameters:
    job_description (str): The job description text.
    resume_text (str): The resume text.

    Returns:
    str: The AI-generated feedback in a structured format.

    Example:
    >>> job_description = "Job description text here..."
    >>> resume_text = "Resume text here..."
    >>> feedback = await getResumeFeedback(job_description, resume_text)
    >>> print(feedback)
    """
    # ai prompt used to extract and categorize skills from a job description
    ai_prompt = f"""Analyze the following resume and job description. Provide a detailed comparison and suggestions to improve the resume to better match the job requirements. Do not assume anything or hypothesize unless the user has specified it. If something is unclear, use that as a suggestion for the user to specify. Structure your response in the following format:

    Skills Alignment:
        Skills mentioned in the job description:
            • example
            • example

        Matching skills found in the resume:
            • example
            • example(repeat this for the rest of the lines)

        Suggested skills to add or emphasize:

    Experience Relevance:
        Relevant experience from the resume:

        Missing experience based on job requirements:

        Suggested ways to bridge any experience gaps:

    Key Achievements:
        Notable achievements from the resume:

        Suggested additional achievements that could be highlighted:

    Missing Keywords:
        Identified important keywords from the job description not found in the resume:

        Suggested ways to incorporate these keywords:

    Overall Structure and Formatting:
        Comments on the resume's current structure:

        Suggested improvements in formatting or organization:

    Summary:
        A brief overall assessment:

        List top 3 areas for improvement:

    Resume:
    {resume_text}

    Job Description:
    {job_description}

    Provide your analysis and suggestions in the structured format described above(keep in mind of the spacing and tabs). 
    Please avoid using any special formatting, like "**" and "###".
    Format headers like "Skills mentioned in the job description:" and "Matching skills found in the resume:" as bold.
    """
    completion = await client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "You are a hiring manager looking to hire a software engineer."},
            {"role": "user", "content": f"{ai_prompt}"},
        ]
    )

    ai_response = completion.choices[0].message.content
    return ai_response


def parseFeedback(feedback):
    """
    Parses feedback text into structured sections.

    Parameters:
    feedback (str): The feedback text to be parsed.

    Returns:
    dict: A dictionary containing the parsed sections:
        - "skills": Skills alignment section.
        - "experience": Experience relevance section.
        - "achievements": Key achievements section.
        - "keywords": Missing keywords section.
        - "structure": Overall structure and formatting section.
        - "summary": Summary section.

    Example:
    >>> feedback = "Skills Alignment: ... Experience Relevance: ... Key Achievements: ... Missing Keywords: ... Overall Structure and Formatting: ... Summary: ..."
    >>> sections = parseFeedback(feedback)
    >>> print(sections["skills"])
    """
    sections = {
        "skills": "",
        "experience": "",
        "achievements": "",
        "keywords": "",
        "structure": "",
        "summary": ""
    }

    patterns = {
        "skills": r"\s*Skills Alignment:\s*(.*?)(?=\s*Experience Relevance:|$)",
        "experience": r"\s*Experience Relevance:\s*(.*?)(?=\s*Key Achievements:|$)",
        "achievements": r"\s*Key Achievements:\s*(.*?)(?=\s*Missing Keywords:|$)",
        "keywords": r"\s*Missing Keywords:\s*(.*?)(?=\s*Overall Structure and Formatting:|$)",
        "structure": r"\s*Overall Structure and Formatting:\s*(.*?)(?=\s*Summary:|$)",
        "summary": r"\s*Summary:\s*(.*)"
    }

    for key, pattern in patterns.items():
        print(f"Matching pattern for section '{key}': {pattern}")  # Debugging statement
        match = re.search(pattern, feedback, re.DOTALL)
        if match:
            section_text = match.group(1).strip()
            # Remove unwanted standalone characters and formatting
            section_text = re.sub(r" - ", " • ", section_text)  # Replace standalone " - " with " • "
            section_text = re.sub(r"- ", "", section_text)  # Remove leading "- " from lines
            section_text = re.sub(r"\*\*", "", section_text)   # Remove "**"
            section_text = re.sub(r"###", "", section_text)    # Remove "###"
            # Remove leading spaces from lines that don't start with a bullet point
            section_text = re.sub(r"(?m)^(?!\s*•)\s+", "", section_text)

            sections[key] = section_text
        else:
            pass

    return sections

# TODO: txt probably not valid to future resume parsing libraries
def resumeTextExtraction(resume):
    """
    Extracts text from a resume file.

    Parameters:
    resume (werkzeug.datastructures.FileStorage): The uploaded resume file.

    Returns:
    str: The extracted text from the resume.

    Raises:
    ValueError: If the file format is not supported.

    Supported file formats:
    - .pdf: Extracts text from each page of the PDF.
    - .docx: Extracts text from each paragraph of the DOCX document.

    Example:
    >>> with open('resume.pdf', 'rb') as f:
    >>>     resume = FileStorage(f)
    >>>     text = resumeTextExtraction(resume)
    >>>     print(text)
    """
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
    # elif file_extension == '.txt':
    #     resume_text = resume.stream.read().decode('utf-8')
    #     return resume_text
    else:
        raise ValueError('Unsupported file format')
    