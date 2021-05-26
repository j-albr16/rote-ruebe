interface IUnit {
  name: string;
  factor: number;
}

export default class Unit {
  unitState: IUnit;

  constructor(constr: IUnit) {
  }

  get name(): string {
    return this.unitState.name;
  }

  /**
   * Retrieving the Factorized Value.
   */
  getValue(value: number): number {
    return value * this.unitState.factor;
  }
}

// export const weightUnit: Unit[] = [
//     new Unit({
//       factor: 0,
//       name: 'Mg',
//     }),
//     new Unit({
//       factor: 1000,
//       name: 'Gr',
//     }),
//     new Unit({
//       factor: 1000 * 1000,
//       name: 'Kg',
//     }),
//   ]
// ;
export const weightUnit: any[] = [
    {
      factor: 0,
      name: 'Mg',
    },
    {
      factor: 1000,
      name: 'Gr',
    },
    {
      factor: 1000 * 1000,
      name: 'Kg',
    }
  ]
;
