import {defaultDate, defaultIUser, IComment} from 'rote-ruebe-types';

const furtherDate = (minutes: number) => {
  const date = new Date(defaultDate);
  date.setMinutes(defaultDate.getMinutes() + minutes);
  return date;
};

export const mockICommentList: IComment[] = [
  // New to old: top to bottom
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

export const mockUnreadICommentCountList: { exchangeObjectId: string, count: number, comment?: IComment }[] = [
  // Old to new: top to bottom
  {
    exchangeObjectId: '420',
    count: 1,
    comment: mockICommentList[3],
  },
  {
    exchangeObjectId: '420',
    count: 0,
    comment: null,
  },
  {
    exchangeObjectId: '420',
    count: 6,
    comment: mockICommentList[2],
  },
  {
    exchangeObjectId: '420',
    count: 5,
    comment: mockICommentList[1],
  },
  {
    exchangeObjectId: '420',
    count: 4,
  },
];
