import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const ORMConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  database: 'bears',
  port: 5432,
  username: 'nadya',
  password: '123pass',
  host: 'localhost',
  synchronize: false,
  logging: false,
  entities: [
    __dirname + '/../**/*.entity{.ts,.js}'
  ],
  migrations: [__dirname + '/../persistence/migrations/*{.ts,.js}']
};

export = ORMConfig;
