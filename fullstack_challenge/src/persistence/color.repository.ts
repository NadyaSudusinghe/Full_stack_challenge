import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Color } from './color.entity';

@Injectable()
export class ColorRepository extends Repository<Color> {
  constructor(readonly dataSource: DataSource) {
    super(Color, dataSource.createEntityManager());
  }

  async findByName(name: string): Promise<Color | null> {
    return this.findOne({ where: { name } });
  }
}

export const ColorRepositoryProvider = {
  provide: ColorRepository,
  useFactory: (dataSource: DataSource): ColorRepository =>
    new ColorRepository(dataSource),
  inject: [DataSource],
};
