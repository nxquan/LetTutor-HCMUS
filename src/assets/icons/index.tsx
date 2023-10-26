import * as React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

export const RecurringScheduleIcon = (props: any) => {
  const { style } = props;
  return (
    <Svg
      aria-hidden='true'
      data-prefix='fas'
      data-icon='calendar'
      className='svg-inline--fa fa-calendar fa-w-14 icon small'
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 448 512'
      {...props}
    >
      <Path
        fill='#0071F0'
        d='M12 192h424c6.6 0 12 5.4 12 12v260c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V204c0-6.6 5.4-12 12-12zm436-44v-36c0-26.5-21.5-48-48-48h-48V12c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v52H160V12c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v52H48C21.5 64 0 85.5 0 112v36c0 6.6 5.4 12 12 12h424c6.6 0 12-5.4 12-12z'
      />
    </Svg>
  );
};
export const TutorIcon = (props: any) => {
  const { style } = props;
  return (
    <Svg
      aria-hidden='true'
      focusable='false'
      data-prefix='fas'
      data-icon='chalkboard-teacher'
      className='svg-inline--fa fa-chalkboard-teacher fa-w-20 icon small'
      role='img'
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 640 512'
      {...props}
    >
      <Path
        fill='#0071F0'
        d='M208 352c-2.39 0-4.78.35-7.06 1.09C187.98 357.3 174.35 360 160 360c-14.35 0-27.98-2.7-40.95-6.91-2.28-.74-4.66-1.09-7.05-1.09C49.94 352-.33 402.48 0 464.62.14 490.88 21.73 512 48 512h224c26.27 0 47.86-21.12 48-47.38.33-62.14-49.94-112.62-112-112.62zm-48-32c53.02 0 96-42.98 96-96s-42.98-96-96-96-96 42.98-96 96 42.98 96 96 96zM592 0H208c-26.47 0-48 22.25-48 49.59V96c23.42 0 45.1 6.78 64 17.8V64h352v288h-64v-64H384v64h-76.24c19.1 16.69 33.12 38.73 39.69 64H592c26.47 0 48-22.25 48-49.59V49.59C640 22.25 618.47 0 592 0z'
      />
    </Svg>
  );
};

export const ScheduleIcon = (props: any) => {
  const { style } = props;
  return (
    <Svg
      aria-hidden='true'
      focusable='false'
      data-prefix='fas'
      data-icon='calendar-check'
      className='svg-inline--fa fa-calendar-check fa-w-14 icon small'
      role='img'
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 448 512'
      {...props}
    >
      <Path
        fill='#0071F0'
        d='M436 160H12c-6.627 0-12-5.373-12-12v-36c0-26.51 21.49-48 48-48h48V12c0-6.627 5.373-12 12-12h40c6.627 0 12 5.373 12 12v52h128V12c0-6.627 5.373-12 12-12h40c6.627 0 12 5.373 12 12v52h48c26.51 0 48 21.49 48 48v36c0 6.627-5.373 12-12 12zM12 192h424c6.627 0 12 5.373 12 12v260c0 26.51-21.49 48-48 48H48c-26.51 0-48-21.49-48-48V204c0-6.627 5.373-12 12-12zm333.296 95.947l-28.169-28.398c-4.667-4.705-12.265-4.736-16.97-.068L194.12 364.665l-45.98-46.352c-4.667-4.705-12.266-4.736-16.971-.068l-28.397 28.17c-4.705 4.667-4.736 12.265-.068 16.97l82.601 83.269c4.667 4.705 12.265 4.736 16.97.068l142.953-141.805c4.705-4.667 4.736-12.265.068-16.97z'
      />
    </Svg>
  );
};
export const HistoryIcon = (props: any) => {
  const { style } = props;
  return (
    <Svg
      aria-hidden='true'
      focusable='false'
      data-prefix='fas'
      data-icon='history'
      className='svg-inline--fa fa-history fa-w-16 icon small'
      role='img'
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 512 512'
      {...props}
    >
      <Path
        fill='#0071F0'
        d='M504 255.531c.253 136.64-111.18 248.372-247.82 248.468-59.015.042-113.223-20.53-155.822-54.911-11.077-8.94-11.905-25.541-1.839-35.607l11.267-11.267c8.609-8.609 22.353-9.551 31.891-1.984C173.062 425.135 212.781 440 256 440c101.705 0 184-82.311 184-184 0-101.705-82.311-184-184-184-48.814 0-93.149 18.969-126.068 49.932l50.754 50.754c10.08 10.08 2.941 27.314-11.313 27.314H24c-8.837 0-16-7.163-16-16V38.627c0-14.254 17.234-21.393 27.314-11.314l49.372 49.372C129.209 34.136 189.552 8 256 8c136.81 0 247.747 110.78 248 247.531zm-180.912 78.784l9.823-12.63c8.138-10.463 6.253-25.542-4.21-33.679L288 256.349V152c0-13.255-10.745-24-24-24h-16c-13.255 0-24 10.745-24 24v135.651l65.409 50.874c10.463 8.137 25.541 6.253 33.679-4.21z'
      />
    </Svg>
  );
};
export const CoursesIcon = (props: any) => {
  const { style } = props;
  return (
    <Svg
      aria-hidden='true'
      focusable='false'
      data-prefix='fas'
      data-icon='graduation-cap'
      className='svg-inline--fa fa-graduation-cap fa-w-20 icon small'
      role='img'
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 640 512'
      {...props}
    >
      <Path
        fill='#0071F0'
        d='M622.34 153.2L343.4 67.5c-15.2-4.67-31.6-4.67-46.79 0L17.66 153.2c-23.54 7.23-23.54 38.36 0 45.59l48.63 14.94c-10.67 13.19-17.23 29.28-17.88 46.9C38.78 266.15 32 276.11 32 288c0 10.78 5.68 19.85 13.86 25.65L20.33 428.53C18.11 438.52 25.71 448 35.94 448h56.11c10.24 0 17.84-9.48 15.62-19.47L82.14 313.65C90.32 307.85 96 298.78 96 288c0-11.57-6.47-21.25-15.66-26.87.76-15.02 8.44-28.3 20.69-36.72L296.6 284.5c9.06 2.78 26.44 6.25 46.79 0l278.95-85.7c23.55-7.24 23.55-38.36 0-45.6zM352.79 315.09c-28.53 8.76-52.84 3.92-65.59 0l-145.02-44.55L128 384c0 35.35 85.96 64 192 64s192-28.65 192-64l-14.18-113.47-145.03 44.56z'
      />
    </Svg>
  );
};
export const MyCourseIcon = (props: any) => {
  const { style } = props;
  return (
    <Svg
      aria-hidden='true'
      focusable='false'
      data-prefix='fas'
      data-icon='book-open'
      className='svg-inline--fa fa-book-open fa-w-18 icon small'
      role='img'
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 576 512'
      {...props}
    >
      <Path
        fill='#0071F0'
        d='M542.22 32.05c-54.8 3.11-163.72 14.43-230.96 55.59-4.64 2.84-7.27 7.89-7.27 13.17v363.87c0 11.55 12.63 18.85 23.28 13.49 69.18-34.82 169.23-44.32 218.7-46.92 16.89-.89 30.02-14.43 30.02-30.66V62.75c.01-17.71-15.35-31.74-33.77-30.7zM264.73 87.64C197.5 46.48 88.58 35.17 33.78 32.05 15.36 31.01 0 45.04 0 62.75V400.6c0 16.24 13.13 29.78 30.02 30.66 49.49 2.6 149.59 12.11 218.77 46.95 10.62 5.35 23.21-1.94 23.21-13.46V100.63c0-5.29-2.62-10.14-7.27-12.99z'
      />
    </Svg>
  );
};
export const BecomeTutorIcon = (props: any) => {
  const { style } = props;
  return (
    <Svg
      aria-hidden='true'
      focusable='false'
      data-prefix='fas'
      data-icon='user-graduate'
      className='svg-inline--fa fa-user-graduate fa-w-14 icon small'
      role='img'
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 448 512'
      {...props}
    >
      <Path
        fill='#0071F0'
        d='M319.4 320.6L224 416l-95.4-95.4C57.1 323.7 0 382.2 0 454.4v9.6c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-9.6c0-72.2-57.1-130.7-128.6-133.8zM13.6 79.8l6.4 1.5v58.4c-7 4.2-12 11.5-12 20.3 0 8.4 4.6 15.4 11.1 19.7L3.5 242c-1.7 6.9 2.1 14 7.6 14h41.8c5.5 0 9.3-7.1 7.6-14l-15.6-62.3C51.4 175.4 56 168.4 56 160c0-8.8-5-16.1-12-20.3V87.1l66 15.9c-8.6 17.2-14 36.4-14 57 0 70.7 57.3 128 128 128s128-57.3 128-128c0-20.6-5.3-39.8-14-57l96.3-23.2c18.2-4.4 18.2-27.1 0-31.5l-190.4-46c-13-3.1-26.7-3.1-39.7 0L13.6 48.2c-18.1 4.4-18.1 27.2 0 31.6z'
      />
    </Svg>
  );
};
export const LogoutIcon = (props: any) => {
  const { style } = props;
  return (
    <Svg
      aria-hidden='true'
      focusable='false'
      data-prefix='fas'
      data-icon='sign-out-alt'
      className='svg-inline--fa fa-sign-out-alt fa-w-16 icon small'
      role='img'
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 512 512'
      {...props}
    >
      <Path
        fill='#0071F0'
        d='M497 273L329 441c-15 15-41 4.5-41-17v-96H152c-13.3 0-24-10.7-24-24v-96c0-13.3 10.7-24 24-24h136V88c0-21.4 25.9-32 41-17l168 168c9.3 9.4 9.3 24.6 0 34zM192 436v-40c0-6.6-5.4-12-12-12H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h84c6.6 0 12-5.4 12-12V76c0-6.6-5.4-12-12-12H96c-53 0-96 43-96 96v192c0 53 43 96 96 96h84c6.6 0 12-5.4 12-12z'
      />
    </Svg>
  );
};
