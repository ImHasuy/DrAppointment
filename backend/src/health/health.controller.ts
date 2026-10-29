import { Controller, Get, VERSION_NEUTRAL } from '@nestjs/common';
import { DataSource } from 'typeorm';
import {
    HealthCheckResult,
    HealthCheckService,
    TypeOrmHealthIndicator,
} from '@nestjs/terminus';
import { ApiTags } from '@nestjs/swagger';

@Controller({ version: VERSION_NEUTRAL })
@ApiTags('health')
export class HealthController {
    constructor(
        private readonly health: HealthCheckService,
        private readonly db: TypeOrmHealthIndicator,
        private dataSource: DataSource,
    ) {}

    @Get('health')
    getHealth(): Promise<HealthCheckResult> {
        return this.health.check([
            () => this.db.pingCheck('database', { connection: this.dataSource }),
        ]);
    }
}