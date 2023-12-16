import {useTranslations} from '@/hooks';

export const getCurrentWeek = (distance: number = 0): any[] => {
  const currentDate = new Date();
  const startDate: Date = new Date(
    currentDate.setDate(currentDate.getDate() + distance),
  );

  const result: any[] = [
    new Date(new Date().setDate(new Date().getDate() + distance)),
  ];
  for (let i = 1; i <= 6; i++) {
    result.push(new Date(startDate.setDate(startDate.getDate() + 1)));
  }
  return result;
};

export const getDayInEnglish = (day: number) => {
  if (day < 0 || day > 6) {
    return 'Unknown';
  }

  const title = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  return title[day];
};

export const getEnglishNameOfMonth = (month: number) => {
  //month [0, 11]
  if (month < 1 || month > 12) {
    return 'Unknown';
  }
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  return months[month - 1];
};

export const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60)
    .toString()
    .padStart(2, '0');
  const secs = (Math.trunc(seconds) % 60).toString().padStart(2, '0');

  return `${mins}:${secs}`;
};

export const formatDate = (date: Date): string => {
  if (date === undefined) {
    return 'dd/mm/yyyy';
  }

  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();

  return `${day} - ${month} - ${year}`;
};

export const convertMinutesToHours = (minutes: number) => {
  const {t} = useTranslations();
  const hours = Math.floor(minutes / 60);
  const _minutes = minutes - hours * 60;
  return `${hours} ${t('tutor.hours')} ${_minutes} ${t('tutor.minutes')}`;
};

export const convertSecondsToMinutes = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds - hours * 3600) / 60);
  const remainingSeconds = seconds - hours * 3600 - minutes * 60;

  return `${hours >= 10 ? hours : '0' + hours} : ${
    minutes >= 10 ? minutes : '0' + minutes
  } : ${remainingSeconds >= 10 ? remainingSeconds : '0' + remainingSeconds}`;
};

export const padNumber = (number: number) => {
  return number < 10 ? '0' + number : number;
};

export const getDateAgo = (date1: number, date2: number) => {
  const diff = date2 - date1;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days < 7) {
    return days + ' days ago';
  } else if (days >= 7 && days < 30) {
    return Math.floor(days / 7) + ' weeks ago';
  } else if (days < 365) {
    return Math.floor(days / 30) + ' months ago';
  } else if (days > 365) {
    return Math.floor(days / 365) + ' years ago';
  }
};
