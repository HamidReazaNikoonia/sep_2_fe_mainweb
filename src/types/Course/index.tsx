/* eslint-disable ts/consistent-type-definitions */
export interface ICourseTypes {
  price_discount: any;
  id: string;
  _id: string;
  createdAt: any;
  preview_media: {
    video_file: {
      _id?: string;
      file_name: string;
    };
    preview_image_mobile: {
      _id?: string;
      file_name: string;
    };
    preview_image_desktop: {
      _id?: string;
      file_name: string;
    };
  };
  title: string;
  sub_title?: string;
  tumbnail_image?: string; // Reference to 'Upload'
  tumbnail: string; // Reference to 'Upload'
  sample_media: {
    media_type: string;
    media_title: string;
    url_address: string;
    file: string; // Reference to 'Upload'
  }[];
  price: number;
  member?: {
    user: string; // Reference to 'User'
  }[];
  max_member_accept?: number;
  course_language?: string;
  course_duration?: number;
  course_type: 'HOZORI' | 'OFFLINE';
  course_subject_header?: number;
  educational_level?: number;
  is_have_licence?: boolean;
  course_views?: number;
  score?: number;
  course_category?: {
    name: string;
    _id: string;
  }; // Reference to 'Course_Category'
  coach_id?: string; // Reference to 'Coach'
  course_objects?: {
    subject_title: string;
    status: 'FREE' | 'PAYED';
    duration?: number;
    files?: string; // Reference to 'Upload'
  }[];
  course_status?: boolean;
  slug?: string;
  course_expire?: boolean;
}
