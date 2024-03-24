import { IUploadData } from '@/models/UploadData/IUploadData';
import { dateWithoutTime } from './ChangeDateFormat';

export const skipDay = (uploadData: IUploadData, currentDate: string): IUploadData => {
  const newUploadData: IUploadData = { habits: uploadData.habits, actions: uploadData.actions } as IUploadData;
  uploadData.habits.forEach((habit) => {
    if (!habit.targetValue) {
      if (habit.period === 'daily') {
        let isFindAction = false;
        uploadData.actions.forEach((action) => {
          if (action.id === habit.id && dateWithoutTime(action.date) === dateWithoutTime(currentDate)) {
            isFindAction = true;
          }
        });
        if (!isFindAction) {
          newUploadData.actions = [...uploadData.actions, { id: habit.id, date: currentDate }];
        }
      } else {
        let isFindAction = false;
        const curDate = new Date(currentDate);
        let nextPeriodAction = new Date(habit.addDate);
        while (nextPeriodAction <= curDate) {
          nextPeriodAction = new Date(
            nextPeriodAction.getTime() + (habit.period === 'weekly' ? 7 : 30) * 24 * 60 * 60 * 1000,
          );
        }
        const prevPeriodDate = new Date(
          nextPeriodAction.getTime() - (habit.period === 'weekly' ? 7 : 30) * 24 * 60 * 60 * 1000,
        );
        uploadData.actions.forEach((action) => {
          if (
            new Date(action.date) >= prevPeriodDate &&
            new Date(action.date) < nextPeriodAction &&
            action.id === habit.id
          ) {
            isFindAction = true;
          }
        });
        if (!isFindAction) {
          newUploadData.actions = [...uploadData.actions, { id: habit.id, date: currentDate }];
        }
      }
    } else {
      if (habit.period === 'daily') {
        let isFindAction = false;
        uploadData.actions.forEach((action) => {
          if (
            action.id === habit.id &&
            dateWithoutTime(action.date) === dateWithoutTime(currentDate) &&
            action.value &&
            habit.targetValue &&
            action.value >= habit.targetValue
          ) {
            isFindAction = true;
          }
        });
        if (!isFindAction) {
          newUploadData.actions = [
            ...uploadData.actions,
            { id: habit.id, date: currentDate, value: habit.targetValue },
          ];
        }
      } else {
        const curDate = new Date(currentDate);
        let nextPeriodAction = new Date(habit.addDate);
        let res = 0;
        while (nextPeriodAction <= curDate) {
          nextPeriodAction = new Date(
            nextPeriodAction.getTime() + (habit.period === 'weekly' ? 7 : 30) * 24 * 60 * 60 * 1000,
          );
        }
        const prevPeriodDate = new Date(
          nextPeriodAction.getTime() - (habit.period === 'weekly' ? 7 : 30) * 24 * 60 * 60 * 1000,
        );
        uploadData.actions.forEach((action) => {
          if (
            new Date(action.date) >= prevPeriodDate &&
            new Date(action.date) < nextPeriodAction &&
            action.id === habit.id
          ) {
            res += action.value ? action.value : 0;
          }
        });
        if (res < habit.targetValue) {
          newUploadData.actions = [
            ...uploadData.actions,
            { id: habit.id, date: currentDate, value: habit.targetValue },
          ];
        }
      }
    }
  });
  return newUploadData;
};
