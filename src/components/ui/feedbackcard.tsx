import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

type FeedbackCardProps = {
    completion: Record<string, string>;
};

const feedbackSections = [
    { title: 'Skills Alignment', id: 'skills' },
    { title: 'Experience Relevance', id: 'experience' },
    { title: 'Key Achievements', id: 'achievements' },
    { title: 'Missing Keywords', id: 'keywords' },
    { title: 'Overall Structure and Formatting', id: 'structure' },
    { title: 'Summary', id: 'summary' },
]

// a function that italicizes, boldens, and underlines headers
function formatFeedback(data: string) {
  if (!data) {
    return <div className="whitespace-pre-wrap font-inter">No data available</div>;
  }

  const headersToBold = [
    'Skills mentioned in the job description:',
    'Matching skills found in the resume:',
    'Suggested skills to add or emphasize:',
    'Relevant experience from the resume:',
    'Missing experience based on job requirements:',
    'Suggested ways to bridge any experience gaps:',
    'Notable achievements from the resume:',
    'Suggested additional achievements that could be highlighted:',
    'Identified important keywords from the job description not found in the resume:',
    'Suggested ways to incorporate these keywords:',
    "Comments on the resume's current structure:",
    'Suggested improvements in formatting or organization:',
    'A brief overall assessment:',
    'List top 3 areas for improvement:',
  ];

  const capitalizeFirstLetter = (text: string) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  let headerEncountered = false;

  const formattedData = data.split('\n').map((line, index) => {
    const trimmedLine = line.trim();
    const capitalizedLine = trimmedLine.startsWith('•')
      ? `• ${capitalizeFirstLetter(trimmedLine.slice(1).trim())}`
      : trimmedLine;

    if (headersToBold.some((header) => capitalizedLine.startsWith(header))) {
      const headerElement = (
        <p key={index} className="font-bold italic underline mb-1">
          {capitalizedLine}
        </p>
      );

      if (headerEncountered) {
        return (
          <React.Fragment key={index}>
            <br />
            {headerElement}
          </React.Fragment>
        );
      } else {
        headerEncountered = true;
        return headerElement;
      }
    }

    return (
      <p key={index} className="mb-1">
        {capitalizedLine}
      </p>
    );
  });

  return <div className="whitespace-pre-wrap font-inter">{formattedData}</div>;
}

const FeedbackCard: React.FC<FeedbackCardProps> = ({ completion: feedback }) => (
  <Card >
    <CardHeader>
      <CardTitle>AI Feedback</CardTitle>
      <CardDescription>
        Here's a detailed comparison of your resume with the job description and suggestions for improvement.
      </CardDescription>
    </CardHeader>
    <CardContent>
    <Accordion type="single" collapsible className="w-full">
      {feedbackSections.map((section) => (
        <AccordionItem key={section.id} value={section.id}>
          <AccordionTrigger>{section.title}</AccordionTrigger>
          <AccordionContent>
            <div className="whitespace-pre-wrap font-inter">
              {formatFeedback(feedback[section.id])}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
    </CardContent>
  </Card>
);

export default FeedbackCard;