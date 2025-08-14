// src/controller/color.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ColorService } from '../service/color.service';
import { Color } from '../persistence/color.entity';

@Controller('color')
export class ColorController {
  constructor(private readonly colorService: ColorService) {}

  @Get()
  findAll(): Promise<Color[]> {
    return this.colorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Color> {
    return this.colorService.findOne(+id);
  }

  @Post()
  create(@Body() data: Partial<Color>): Promise<Color> {
    return this.colorService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() data: Partial<Color>): Promise<Color> {
    return this.colorService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.colorService.remove(+id);
  }
}
