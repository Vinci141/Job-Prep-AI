
export interface LearningResource {
  title: string;
  url: string;
  description: string;
}

export interface InterviewQuestion {
  question: string;
  answer: string;
}

export interface PrepPlan {
  jobRole: string;
  keySkills: string[];
  technicalQuestions: InterviewQuestion[];
  behavioralQuestions: InterviewQuestion[];
  learningResources: LearningResource[];
}
