import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Color } from "../persistence/color.entity";

@Injectable()
export class ColorService {
  constructor(
    @InjectRepository(Color)
    private readonly colorRepo: Repository<Color>
  ) {}

  findAll(): Promise<Color[]> {
    return this.colorRepo.find({ relations: ["bears"] });
  }

  async findOne(id: number): Promise<Color> {
    const color = await this.colorRepo.findOne({
      where: { id },
      relations: ["bears"],
    });
    if (!color) throw new NotFoundException(`Color with ID ${id} not found`);
    return color;
  }

  create(data: Partial<Color>): Promise<Color> {
    const color = this.colorRepo.create(data);
    return this.colorRepo.save(color);
  }

  async update(id: number, data: Partial<Color>): Promise<Color> {
    await this.colorRepo.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const color = await this.colorRepo.findOne({
      where: { id },
      relations: ["bears"],
    });

    if (!color) {
      throw new NotFoundException(`Color with ID ${id} not found`);
    }

    if (color.bears && color.bears.length > 0) {
      throw new BadRequestException(
        `Cannot delete color "${color.name}" because it is associated with ${color.bears.length} bears.`
      );
    }

    await this.colorRepo.delete(id);
  }
}
