import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import axios from 'axios'
import { useState } from 'react'

export interface FormProps {
  file: File | null;
  setFile: (file: File | null) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  onFeedBackReceived: (feedback: Record<string, string>) => void;
}

export function Form({ file, setFile, isLoading, setIsLoading, onFeedBackReceived }: FormProps) {
  const [prevResume, setPrevResume] = useState<File | null>(null);
  const [prevJobDescription, setPrevJobDescription] = useState<string>('');

  const validateFile = (file: File): boolean => {
    const allowedExtensions = ['.pdf', '.docx', '.txt'];
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    return fileExtension ? allowedExtensions.includes(`.${fileExtension}`) : false;
  };

  const prepareFormData = (file: File, jobDescription: string): FormData => {
    const formData = new FormData();
    formData.append('resume', file);
    formData.append('jobDescription', jobDescription);
    return formData;
  };

  const isDuplicateAnalysis = (file: File, jobDescription: string): boolean => {
    return file === prevResume && jobDescription === prevJobDescription;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      return;
    }

    if (!validateFile(file)) {
      alert('Invalid file type. Please upload a .pdf, .docx, or .txt file.');
      return;
    }

    const jobDescription = e.currentTarget.jobDescription.value;

    if (isDuplicateAnalysis(file, jobDescription)) {
      alert('You have already analyzed this resume with the same job description. Please change the job description or upload a different resume.');
      return;
    }

    const formData = prepareFormData(file, jobDescription);

    try {
      setIsLoading(true);
      const response = await axios.post('http://127.0.0.1:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const feedback = response.data.feedback;

      onFeedBackReceived(feedback);
      console.log(response.data);
      setPrevResume(file);
      setPrevJobDescription(jobDescription);
      alert('Analyzed resume!');
    } catch (error: any) {
      console.error('Error uploading file and description:', error);
      alert('Error uploading file and description: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="resume">Resume (.pdf, .docx, or .txt)</Label>
        <Input
          id="resume"
          type="file"
          accept=".pdf,.txt,.docx"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          required
        />
      </div>
      <div>
        <Label htmlFor="jobDescription">Job Description</Label>
        <Textarea
          id="jobDescription"
          name="jobDescription"
          placeholder="Paste the job description here..."
          required
          style={{ resize: 'both', minHeight: '300px', maxHeight: '450px', minWidth: '100%', maxWidth: '100%' }}
        />
      </div>
      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Analyzing...' : 'Analyze Resume'}
      </Button>
    </form>
  );
}

export default Form;