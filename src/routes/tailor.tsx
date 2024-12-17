import { useState } from 'react'
import UploadCard from '@/components/ui/analyzeCard'
import FeedbackCard from '@/components/ui/feedbackcard'

export function TailorDashboard() {
  type Feedback = {
    [key: string]: string;
  };
  
  const [file, setFile] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [completion, setCompletion] = useState<Feedback>({});
  
  const handleFeedBackReceived = (feedback: Record<string, string>) => {
    for (const [key, value] of Object.entries(feedback)) {
      if (!value.trim()) {
        console.log(feedback);
        throw new Error(`Received empty field for ${key}`);
      }
    }

    setCompletion(feedback);
    console.log(feedback);
  };
  
  return (
    <div className="h-full w-full mt-4">
      <div className="flex-grow container mx-auto p-4">
        <div className="grid md:grid-cols-2 gap-4">
          <UploadCard 
            file={file}
            setFile={setFile}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            onFeedBackReceived={handleFeedBackReceived}
          />
          <FeedbackCard completion={completion} />
        </div>
      </div>
    </div>
  );
}

export default TailorDashboard;