import { Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';

export async function migrateDatabase(
    dataSource: DataSource,
    logger: Logger,
): Promise<void> {
    const registeredMigrations = dataSource.migrations.map(
        (migration) => migration.name,
    );
    logger.verbose(`Registered migrations: \n${registeredMigrations.join('\n')}`);

    const isTherePendingMigration = await dataSource.showMigrations();
    logger.log(`Is there pending migration: ${isTherePendingMigration}`);

    if (isTherePendingMigration) {
        logger.log('Starting database migration');

        try {
            await dataSource.runMigrations();
        } catch (error) {
            logger.error('Failed to migrate the database');

            if (error instanceof Error) {
                logger.error(error.message, error.stack);
            } else {
                logger.error(error);
            }

            return process.exit(1);
        }

        logger.log('Database migration finished successfully');
    }

    logger.log('Database is ready to use');
}