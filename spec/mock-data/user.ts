import {IUser} from 'rote-ruebe-types';


export const mock5User: IUser[] = [
  { id: '0',
    description: 'First description',
    image: {
      id: '0',
      description: 'the first Image',
      createdAt: new Date('2020-04-22'),
      updatedAt: new Date('2020-04-22'),
      title: 'TestImage'
    },
    userName: 'Susan',
    createdAt:  new Date('2020-04-20'),
    updatedAt: new Date('2020-04-21'),
  },
  { id: '1',
    description: 'Someething',
    image: {
      id: 'ID01',
      description: 'the Image',
      createdAt: new Date('2020-08-24'),
      updatedAt: new Date('2020-08-24'),
      title: 'TestImage'
    },
    userName: 'Kim',
    createdAt:  new Date('2020-04-23'),
    updatedAt: new Date('2020-05-13'),
  },
  {
    id: '2',
    description: 'Someething',
    image: {
      id: 'ID01',
      description: 'the Image',
      createdAt: new Date('2020-06-09'),
      updatedAt: new Date('2020-12-18'),
      title: 'TestImage'
    },
    userName: 'Tom',
    createdAt: new Date('2019-04-20'),
    updatedAt: new Date('2019-04-20'),
  },
  { id: '3',
    description: 'Someething',
    image: {
      id: 'ID01',
      description: 'the Image',
      createdAt: new Date('2021-04-20'),
      updatedAt: new Date('2021-04-20'),
      title: 'TestImage'
    },
    userName: 'Jens',
    createdAt:  new Date('2020-04-20'),
    updatedAt: new Date('2020-08-20'),
  },
  { id: '4',
    description: 'Someething',
    image: {
      id: 'ID01',
      description: 'the Image',
      createdAt: new Date('2018-04-20'),
      updatedAt: new Date('2018-04-20'),
      title: 'TestImage'
    },
    userName: 'Josephine',
    createdAt:  new Date('2017-04-20'),
    updatedAt: new Date('2017-04-20'),
  }

]
