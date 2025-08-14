import { Module } from '@nestjs/common';
import { BearController } from './controller/bear.controller';
import { BearService } from './service/bear.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import ORMConfig = require("./config/typeOrmConfig");
import {BearRepositoryProvider} from "./persistence/bear.repository";
import { Color } from './persistence/color.entity';
import { ColorController } from './controller/color.controller';
import { ColorService } from './service/color.service';
import { ColorRepositoryProvider } from './persistence/color.repository';

@Module({
    imports: [
        TypeOrmModule.forRoot(ORMConfig),
        TypeOrmModule.forFeature([Color])
    ],
    controllers: [BearController, ColorController],
    providers: [
        BearRepositoryProvider,
        BearService,
        ColorRepositoryProvider,
        ColorService
    ],
})
export class AppModule {}
