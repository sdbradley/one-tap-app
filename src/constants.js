import { join } from 'util/path';

export const SITE_ROOT = (window.location.hostname === 'localhost') ? 'http://localhost:3100' : 'http://1tap.ontappipeline.com.s3-website-us-east-1.amazonaws.com';
export const APP_ROOT = `${SITE_ROOT}/app/#/`;
export const API_ROOT = (window.location.hostname === 'localhost') ? 'http://localhost:3101' : `http://one-tap-api.us-east-1.elasticbeanstalk.com`;
export const API_LOCATION = join(API_ROOT, 'api') ;
export const EMAIL_PATTERN = /^[^@]+@[^@]+\.[^@]+$/;
export const ROOT_ELEMENT = document.getElementById('root');

export const CLIENT_ROOT = window.location.origin;
export const CLIENT_MOUNTPOINT = '#';
export const CLIENT_LOCATION = join(CLIENT_ROOT, CLIENT_MOUNTPOINT);
export const SECONDS_TO_LOGOUT = 1800;
export const INACTIVITY_WARNING_DURATION = 30;

export const JW_KEY = '8cB9Sxgb2AtQvyMguOWpxaUHPuwhBL6OlBS8A3KIErQ=';

// Roles
export const ROLE = {
  ADMIN: 'Admin',
  STUDENT: 'Student',
  TEACHER: 'Instructor',
};

// Gradebook Sorting
export const SORT_TYPE = {
  NAME: 'NAME',
  PROGRESS: 'PROGRESS',
  GRADE: 'GRADE',
  EMAIL: 'EMAIL'
}

// Rights
export const RIGHT = {
  ADMIN_DASHBOARD: 1,
  COURSES_DASHBOARD: 2,
  CLASSES_DASHBOARD: 3,
  COURSE_SYLLABUS: 4,
  ENROLLMENT_MODULES: 5,
  COURSE_MODULES: 6,
  COURSE_GRADEBOOK: 7,
  COMPLETE_CONTENT_ITEM: 8,
  VIEW_TEACHER_GUIDE: 9,
  IGNORE_CLASSROOM_MODE: 10,
  ENROLLMENT_GRADEBOOK: 11,
  COURSE_STUDENTS: 12,
  COURSE_MATERIALS: 13
};

// Content Types
export const CONTENT_TYPE = {
  MARKDOWN: 'Markdown',
  VIDEO: 'Video',
  ASSESSMENT: 'Assessment',
  ACTIVITY: 'Activity',
  DOWNLOAD: 'Download',
  SURVEY: 'Survey'
};

// Position for Interrupters
export const INTERRUPTER_POSITION = {
  TOP: 'top',
  RIGHT: 'right',
  BOTTOM: 'bottom',
  LEFT: 'left'
};
