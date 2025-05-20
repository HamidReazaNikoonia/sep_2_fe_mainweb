/* eslint-disable ts/consistent-type-definitions */
interface QuestionOption {
  _id: string;
  text: string;
  isCorrect: boolean;
}

interface CourseQuestion {
  _id: string;
  question_title: string;
  options: QuestionOption[];
  points: number;
}

interface CourseObject {
  _id: string;
  title: string;
  description: string;
  video_file: string | string; // Can be ObjectId or populated document
  exam: CourseQuestion[];
  order: number;
}

export interface CoachCourseProgram {
  data: any;
  course_object_titles: any;
  _id: string;
  title: string;
  description: string;
  amount: number;
  is_have_penalty: boolean;
  penalty_fee: number;
  course_subject_count: number;
  course_object?: CourseObject[];
  createdBy: string; // Can be ObjectId or populated user
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type CoachProfile = {
  coach_Information: CompleteCoachInfoPayload;
  id: string;
  first_name: string;
  last_name: string;
  father_name: string;
  national_code: string;
  birth_date: string;
  city: number;
  state: string;
  description: string;
  group_name: string;
  // Add other profile fields as needed
};

export type CompleteCoachInfoPayload = {
  father_name: string;
  national_code: string;
  birth_date: string;
  city: number;
  state: string;
  description: string;
  group_name: string;
};
