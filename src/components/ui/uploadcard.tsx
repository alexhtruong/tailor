import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./card"
import { Form, FormProps } from "./form"


interface UploadCardProps extends FormProps {}

const UploadCard: React.FC<UploadCardProps> = ({ file, setFile, isLoading, setIsLoading, onFeedBackReceived }) => (
  <Card>
    <CardHeader>
      <CardTitle>Upload Resume and Job Description</CardTitle>
      <CardDescription>
        Upload your resume and paste the job description to get tailored suggestions.
      </CardDescription>
    </CardHeader>
    <CardContent>
      <Form
        file={file}
        setFile={setFile}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        onFeedBackReceived={onFeedBackReceived}
      />
    </CardContent>
  </Card>
);

export default UploadCard;

