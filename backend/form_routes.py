# backend/form_routes.py
from flask import Blueprint, request, jsonify
from resume import parseFeedback, getResumeFeedback, resumeTextExtraction

form_bp = Blueprint('form_bp', __name__)

"""
    The function `formSubmission` handles the submission of a form with a resume file and job
    description, extracts text from the resume file, provides feedback on the resume based on the job
    description, and returns parsed feedback in a JSON response.
    :return: The code snippet defines a route '/upload' that accepts POST requests. It checks if a
    resume file and a job description are included in the request. If either of them is missing, it
    returns an error response with a status code of 400.
"""
@form_bp.route('/upload', methods=['POST'])
async def handleFormSubmission():
    try:
        if 'resume' not in request.files:
            return jsonify({"error": "No resume file received"}), 400
        if 'jobDescription' not in request.form:
            return jsonify({"error": "No job description received"}), 400

        resume_file = request.files['resume']
        job_description = request.form['jobDescription']
        try:
            resume_text = resumeTextExtraction(resume_file)
        except ValueError as e:
            return jsonify({"error": str(e)}), 400
        
        feedback = await getResumeFeedback(job_description, resume_text)
        if not feedback:
            return jsonify({"error": "No feedback received from AI"}), 500
        
        parsed_feedback = parseFeedback(feedback)
        print(parsed_feedback)
        return jsonify({'message': 'Form received', 'feedback': parsed_feedback})
    except Exception as e:
        # Log the error
        print(f"Error: {str(e)}")
        return jsonify({"error": str(e)}), 500