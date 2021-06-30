import {defaultDate, defaultIUser, IComment} from 'rote-ruebe-types';

const furtherDate = (minutes: number) => {
  const date = new Date(defaultDate);
  date.setMinutes(defaultDate.getMinutes() + minutes);
  return date;
};

export const mockICommentList: IComment[] = [
  {
    id: '3',
    updatedAt: furtherDate(3),
    createdAt: furtherDate(3),
    text: 'commentThree',
    author: defaultIUser,
    exchangeObjectId: '420',
  },
  {
    id: '2',
    updatedAt: furtherDate(2),
    createdAt: furtherDate(2),
    text: 'commentTwo',
    author: defaultIUser,
    exchangeObjectId: '420',
  },
  {
    id: '1',
    updatedAt: furtherDate(1),
    createdAt: furtherDate(1),
    text: 'commentOne',
    author: defaultIUser,
    exchangeObjectId: '420',
  },
  {
    id: '0',
    updatedAt: furtherDate(0),
    createdAt: furtherDate(0),
    text: 'commentZero',
    author: defaultIUser,
    exchangeObjectId: '420',
  },
];
