import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {Logger, ValidationPipe} from "@nestjs/common";
import {DataSource} from "typeorm";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {migrateDatabase} from "./database/database.utils";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const logger = new Logger('Bootstrap');

  app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true
      }),
  );
  app.enableVersioning();

  const dataSource = app.get(DataSource);
  await migrateDatabase(dataSource, logger);

  const config = new DocumentBuilder()
      .setTitle('DrAppointment')
      .setDescription("Appointment manage software")
      .addBearerAuth({
          description: `Enter your access token in the following format: Bearer <JWT>`,
          name: 'Authorization',
          bearerFormat: 'Bearer',
          scheme: 'Bearer',
          type: 'http',
          in: 'Header',
      })
      .setVersion('1.0')
      .build();

  const document = SwaggerModule.createDocument(app,config);

  SwaggerModule.setup('docs',app,document);


  logger.log('listening on :3000');



  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
