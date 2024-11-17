# Description: This file will be used to parse the job description that the user inputs
from flask import Flask, request, jsonify
from flask_cors import CORS
from openai_client import parseFeedback, getResumeFeedback
from resume_parser import resumeTextExtraction

# load the flask app
app = Flask(__name__)
CORS(app)

"""
    The function `formSubmission` handles the submission of a form with a resume file and job
    description, extracts text from the resume file, provides feedback on the resume based on the job
    description, and returns parsed feedback in a JSON response.
    :return: The code snippet defines a route '/upload' that accepts POST requests. It checks if a
    resume file and a job description are included in the request. If either of them is missing, it
    returns an error response with a status code of 400.
    """
@app.route('/upload', methods=['POST'])
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

if __name__ == '__main__':
    app.run(debug=True)