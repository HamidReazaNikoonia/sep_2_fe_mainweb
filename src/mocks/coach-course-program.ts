import type { CoachCourseProgram } from '@/types/Coach';

export const mockCoachCoursePrograms: CoachCourseProgram[] = [
  {
    _id: '65a1b2c3d4e5f6a7b8c9d0e1',
    title: 'دوره آموزش جامع ریاضی',
    description: 'دوره کامل آموزش ریاضیات پایه تا پیشرفته',
    amount: 250000,
    is_have_penalty: true,
    penalty_fee: 50000,
    course_subject_count: 3,
    course_object: [
      {
        _id: '65a1b2c3d4e5f6a7b8c9d0e2',
        title: 'جبر مقدماتی',
        description: 'آموزش مفاهیم پایه جبر',
        video_file: '65a1b2c3d4e5f6a7b8c9d0e3',
        exam: [
          {
            _id: '65a1b2c3d4e5f6a7b8c9d0e4',
            question_title: 'معادله 2x + 5 = 15 را حل کنید',
            points: 1,
            options: [
              {
                _id: '65a1b2c3d4e5f6a7b8c9d0e5',
                text: 'x = 5',
                isCorrect: true,
              },
              {
                _id: '65a1b2c3d4e5f6a7b8c9d0e6',
                text: 'x = 10',
                isCorrect: false,
              },
            ],
          },
        ],
        order: 1,
      },
      {
        _id: '65a1b2c3d4e5f6a7b8c9d0e7',
        title: 'هندسه پایه',
        description: 'آموزش اصول هندسه',
        video_file: '65a1b2c3d4e5f6a7b8c9d0e8',
        exam: [],
        order: 2,
      },
      {
        _id: '65a1b2c3d4e5f6a7b8c9d0e9',
        title: 'مثلثات',
        description: 'آموزش مفاهیم مثلثات',
        video_file: '65a1b2c3d4e5f6a7b8c9d0ea',
        exam: [
          {
            _id: '65a1b2c3d4e5f6a7b8c9d0eb',
            question_title: 'سینوس زاویه 30 درجه چقدر است؟',
            points: 1,
            options: [
              {
                _id: '65a1b2c3d4e5f6a7b8c9d0ec',
                text: '0.5',
                isCorrect: true,
              },
              {
                _id: '65a1b2c3d4e5f6a7b8c9d0ed',
                text: '1',
                isCorrect: false,
              },
            ],
          },
        ],
        order: 3,
      },
    ],
    createdBy: '65a1b2c3d4e5f6a7b8c9d0ee',
    isPublished: true,
    createdAt: new Date('2023-12-01T10:00:00Z'),
    updatedAt: new Date('2023-12-05T15:30:00Z'),
  },
  {
    _id: '65a1b2c3d4e5f6a7b8c9d0f1',
    title: 'دوره آموزش برنامه نویسی وب',
    description: 'آموزش کامل توسعه وب از مبتدی تا پیشرفته',
    amount: 400000,
    is_have_penalty: false,
    penalty_fee: 0,
    course_subject_count: 4,
    course_object: [
      {
        _id: '65a1b2c3d4e5f6a7b8c9d0f2',
        title: 'HTML و CSS',
        description: 'آموزش ساختار صفحات وب',
        video_file: '65a1b2c3d4e5f6a7b8c9d0f3',
        exam: [],
        order: 1,
      },
      {
        _id: '65a1b2c3d4e5f6a7b8c9d0f4',
        title: 'JavaScript پایه',
        description: 'آموزش اصول جاوااسکریپت',
        video_file: '65a1b2c3d4e5f6a7b8c9d0f5',
        exam: [
          {
            _id: '65a1b2c3d4e5f6a7b8c9d0f6',
            question_title: 'کدام یک از موارد زیر مقدار falsy نیست؟',
            points: 1,
            options: [
              {
                _id: '65a1b2c3d4e5f6a7b8c9d0f7',
                text: '0',
                isCorrect: false,
              },
              {
                _id: '65a1b2c3d4e5f6a7b8c9d0f8',
                text: '"false"',
                isCorrect: true,
              },
            ],
          },
        ],
        order: 2,
      },
      {
        _id: '65a1b2c3d4e5f6a7b8c9d0f9',
        title: 'React.js',
        description: 'آموزش کتابخانه React',
        video_file: '65a1b2c3d4e5f6a7b8c9d0fa',
        exam: [],
        order: 3,
      },
    ],
    createdBy: '65a1b2c3d4e5f6a7b8c9d0fb',
    isPublished: false,
    createdAt: new Date('2023-11-15T09:30:00Z'),
    updatedAt: new Date('2023-11-20T14:15:00Z'),
  },
  {
    _id: '65a1b2c3d4e5f6a7b8c9d0fc',
    title: 'دوره آموزش زبان انگلیسی',
    description: 'آموزش زبان انگلیسی از مبتدی تا پیشرفته',
    amount: 180000,
    is_have_penalty: true,
    penalty_fee: 30000,
    course_subject_count: 5,
    course_object: [
      {
        _id: '65a1b2c3d4e5f6a7b8c9d0fd',
        title: 'گرامر مقدماتی',
        description: 'آموزش زمان حال ساده',
        video_file: '65a1b2c3d4e5f6a7b8c9d0fe',
        exam: [
          {
            _id: '65a1b2c3d4e5f6a7b8c9d0ff',
            question_title: 'معنی کلمه "Apple" چیست؟',
            points: 1,
            options: [
              {
                _id: '65a1b2c3d4e5f6a7b8c9d100',
                text: 'سیب',
                isCorrect: true,
              },
              {
                _id: '65a1b2c3d4e5f6a7b8c9d101',
                text: 'موز',
                isCorrect: false,
              },
            ],
          },
        ],
        order: 1,
      },
    ],
    createdBy: '65a1b2c3d4e5f6a7b8c9d102',
    isPublished: true,
    createdAt: new Date('2023-10-10T08:00:00Z'),
    updatedAt: new Date('2023-10-25T11:45:00Z'),
  },
];
