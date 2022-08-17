import { validateSync } from 'class-validator';

export abstract class ReadModel<Entity> {
  protected constructor(props: Partial<ReadModel<Entity>>) {
    Object.assign(this, props);
    Object.freeze(this);

    const errors = validateSync(this);

    if (errors.length) {
      throw new Error('Validation errors:' + errors);
    }
  }

  abstract toEntity(): Entity;
}
