import { Match, TOSS } from '../../top-n.test';

export interface Filter {
  isValid(): boolean;
}

export class And implements Filter {
  constructor(private readonly filters: Filter[]) {}
  isValid(): boolean {
    return this.filters.every((filter) => filter.isValid());
  }
}

export class Or implements Filter {
  constructor(private readonly filters: Filter[]) {}
  isValid(): boolean {
    return this.filters.some((filter) => filter.isValid());
  }
}

export class Not implements Filter {
  constructor(private readonly filters: Filter[]) {}
  isValid(): boolean {
    return !this.filters.every((filter) => filter.isValid());
  }
}

export class FieldFirst implements Filter {
  constructor(private readonly match: Match) {}

  isValid(): boolean {
    return this.match.TOSS_DECISION === TOSS.FIELD;
  }
}
