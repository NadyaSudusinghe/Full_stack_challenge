import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { BearService } from "../service/bear.service";
import { Bear } from "../persistence/bear.entity";

@Controller("bear")
export class BearController {
  constructor(private readonly bearService: BearService) {}

  @Get()
  findAll(): Promise<Bear[]> {
    return this.bearService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: number): Promise<Bear> {
    return this.bearService.findOne(+id);
  }

  @Post()
  create(@Body() bearData: Partial<Bear>): Promise<Bear> {
    return this.bearService.create(bearData);
  }

  @Put(":id")
  update(
    @Param("id") id: number,
    @Body() bearData: Partial<Bear>
  ): Promise<Bear> {
    return this.bearService.update(+id, bearData);
  }

  @Delete(":id")
  remove(@Param("id") id: number): Promise<void> {
    return this.bearService.remove(+id);
  }

  @Get("size-in-range/:start/:end")
  getBearBySizeInRange(
    @Param("start") start: number,
    @Param("end") end: number
  ): Promise<string[]> {
    if (start > end) {
      throw new BadRequestException(`Start ${start} is larger than end ${end}`);
    }

    return this.bearService.findBearBySizeInRange(start, end);
  }

  @Get("colors/:colorName")
  findBearsByColor(@Param("colorName") colorName: string) {
    return this.bearService.findBearsByColor(colorName);
  }
}
