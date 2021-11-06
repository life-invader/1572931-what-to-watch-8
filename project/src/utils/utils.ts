import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

const HOUR = 3600;

export const formatRuntime = (runtime: number): string => dayjs.duration(runtime, 'minutes').format('H[h] mm[m]');
export const formatDatetime = (date: Date): string => dayjs(date).format('YYYY-MM-DD');
export const formatHumanizedDate = (date: Date): string => dayjs(date).format('MMMM D, YYYY');

export const formatRemainingTime = (remainingTime: number): string => {
  const format = remainingTime >= HOUR ? '-HH:mm:ss' : '-mm:ss';
  return dayjs.duration(remainingTime, 'seconds').format(format);
};
