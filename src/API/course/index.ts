import { ICourseTypes } from '@/types/Course';


import {SERVER_API_URL} from '../config';

const API_BASE_URL = SERVER_API_URL;
// const API_TOKEN = SERVER_API_TOKEN;

interface FilterParams {
  search?: string;
  sort?: string;
  category?: string;
  brand?: string;
  price_from?: number;
  price_to?: number;
}

interface CourseResponse {
  data: {
    count: number;
    courses: ICourseTypes[];
  }
}


async function getSpecificUserCourse({ courseId }: { courseId: string }) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer ....",
    },
  };

  const response = fetch(
    `${API_BASE_URL}/course/${courseId}`,
    options
  )
    .then((response) => response.json())
    .catch((err) => console.error(err));

  return response;
}


async function getCategories() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer ....",
    },
  };

  const response = fetch(
    `${API_BASE_URL}/course/category`,
    options
  )
    .then((response) => response.json())
    .catch((err) => console.error(err));

  return response;
}



async function getCourses(params: FilterParams = {}): Promise<CourseResponse> {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
  }
}

  // Only include non-empty parameters in the request
  const filteredParams = Object.fromEntries(
    Object.entries(params).filter(([_, value]) => value !== undefined && value !== '')
  );

  console.log({ filteredParams })

  const response = fetch(
    `${API_BASE_URL}/course?${new URLSearchParams(filteredParams)}`,
    options
  )
    .then((response) => response.json())
    .catch((err) => console.error(err));

  return response;
}



// export async function getComments(page: number, productId: string) {
//   const options = {
//     method: 'GET',
//     headers: {
//       accept: 'application/json',
//       Authorization: `Bearer ${API_TOKEN}`,
//     },
//   };

//   const response = await fetch(
//     `${API_BASE_URL}/product/${productId}/hamid/review?page=${page}`,
//     options
//   );

//   if (!response.ok) {
//     throw new Error('Network response was not ok');
//   }

//   return response.json();
// }


// export async function submitComment(commentData: { text: string, productId: string, rating: number, name?: string }) {
//   const options = {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${API_TOKEN}`,
//     },
//     body: JSON.stringify(commentData),
//   };

//   const response = await fetch(
//     `${API_BASE_URL}/product/${commentData.productId}/hamid/review?page`,
//     options
//   );

//   if (!response.ok) {
//     throw new Error('Network response was not ok');
//   }

//   return response.json();
// }

export async function getCourseSessionPrograms(courseId: string) {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      // Authorization: `Bearer ${API_TOKEN}`,
    },
  };

  const response = await fetch(
    `${API_BASE_URL}/course-session/${courseId}/program`,
    options,
  );

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json();
}

export async function getCourseSessionProgramById(programId: string) {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
  };

  const response = await fetch(
    `${API_BASE_URL}/course-session/program/${programId}`,
    options,
  );

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json();
}

export async function getCoursesRequest(params: FilterParams) {
  const data = await getCourses(params);
  return data;
}

export async function getSpecificUserCourseRequest(body: { courseId: string }) {
  const data = await getSpecificUserCourse(body);
  return data;
}

export async function getCourseSessionProgramByIdRequest(body: { programId: string }) {
  const data = await getCourseSessionProgramById(body.programId);
  return data;
}

export async function getCategoriesRequest() {
  const data = await getCategories();
  return data;
}

// export async function getCommentsRequest({page, productId}) {
//   const data = await getComments(page, productId);
//   return data;
// }

// export async function submitCommentRequest(commentData) {
//   const data = await submitComment(commentData);
//   return data;
// }
