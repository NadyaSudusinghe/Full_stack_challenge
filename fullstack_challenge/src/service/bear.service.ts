import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import { BearRepository } from "../persistence/bear.repository";
import { Bear } from "../persistence/bear.entity";

@Injectable()
export class BearService {
  constructor(private readonly bearRepository: BearRepository) {}

  async findBearBySizeInRange(start: number, end: number): Promise<string[]> {
    const bears = await this.bearRepository.findBearBySizeInRange(start, end);
    return bears.map((bear) => bear.name);
  }

  async findAll(): Promise<Bear[]> {
    return this.bearRepository.find({ relations: ["colors"] });
  }

  async findOne(id: number): Promise<Bear> {
    const bear = await this.bearRepository.findOne({
      where: { id },
      relations: ["colors"],
    });
    if (!bear) {
      throw new NotFoundException(`Bear with ID ${id} not found`);
    }
    return bear;
  }

  async create(bearData: Partial<Bear>): Promise<Bear> {
    const bear = this.bearRepository.create(bearData);
    return this.bearRepository.save(bear);
  }

  async update(id: number, bearData: Partial<Bear>): Promise<Bear> {
    // await this.bearRepository.update(id, bearData);
    // return this.findOne(id);
    const bear = await this.bearRepository.findOne({
      where: { id },
      relations: ["colors"],
    });
    if (!bear) throw new Error("Bear not found");

    Object.assign(bear, bearData);

    return await this.bearRepository.save(bear);
  }

  async remove(id: number): Promise<void> {
    await this.bearRepository.delete(id);
  }

  async findBearsByColor(colorName: string): Promise<Bear[]> {
    return this.bearRepository.findBearsByColor(colorName);
  }
}
