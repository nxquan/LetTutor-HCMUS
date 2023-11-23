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
