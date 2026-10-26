import {Module} from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import {ConfigModule, ConfigService} from "@nestjs/config";
import path from "path/posix";

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                type: 'mysql',
                host: configService.get('DATABASE_HOST'),
                port: +configService.get('DATABASE_PORT'),
                username: configService.get('DATABASE_USERNAME'),
                password: configService.get('DATABASE_PASSWORD'),
                database: configService.get('DATABASE'),
                autoLoadEntities: true,
                migrationsRun: true,
                migrations: [path.resolve(__dirname, '..', 'migrations', '*{.ts,.js}')],
            }),
        }),
    ],
})
export class DatabaseModule {}