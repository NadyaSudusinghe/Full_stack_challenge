import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import { BearRepository } from "../persistence/bear.repository";
import { Bear } from "../persistence/bear.entity";
import { In } from "typeorm";

@Injectable()
export class BearService {
  constructor(private readonly bearRepository: BearRepository) {}

  async searchBears(query?: string): Promise<Bear[]> {
    // If no query is provided, return all the bear
    if (!query) {
      return await this.bearRepository.find({ relations: ["colors"] });
    }

    const queryBuilder = this.bearRepository.createQueryBuilder("bear");


    const lowerCaseQuery = query.toLowerCase();

    // Size filters
    if (lowerCaseQuery.includes("big")) {
      queryBuilder.andWhere("bear.size > 200");
    } else if (lowerCaseQuery.includes("medium")) {
      queryBuilder.andWhere("bear.size >= 100 AND bear.size <= 200");
    } else if (lowerCaseQuery.includes("small")) {
      queryBuilder.andWhere("bear.size < 100");
    }

    // Color filters
    const colors = ["brown", "white", "black", "cinnamon", "golden", "cream"];
    const foundColors = colors.filter((color) =>
      lowerCaseQuery.includes(color)
    );

    if (foundColors.length > 0) {
      // queryBuilder
      //   .leftJoinAndSelect("bear.colors", "color")
      //   .andWhere("LOWER(color.name) IN (:...colors)", { colors: foundColors })
      //   .groupBy("bear.id")
      //   .addGroupBy("color.id")
      //   .having("COUNT(DISTINCT color.name) = :colorCount", {
      //     colorCount: foundColors.length,
      //   });
      queryBuilder
        .leftJoinAndSelect("bear.colors", "color")
        .andWhere((qb) => {
          const subQuery = qb
            .subQuery()
            .select("bc.bearId")
            .from("bear_colors_color", "bc")
            .leftJoin("color", "c", "c.id = bc.colorId")
            .where("LOWER(c.name) IN (:...colors)")
            .groupBy("bc.bearId")
            .having("COUNT(DISTINCT LOWER(c.name)) = :colorCount")
            .getQuery();
          return "bear.id IN " + subQuery;
        })
        .setParameter("colors", foundColors)
        .setParameter("colorCount", foundColors.length);
    } else {
      queryBuilder.leftJoinAndSelect("bear.colors", "color");
    }

    return await queryBuilder.getMany();
  }

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
