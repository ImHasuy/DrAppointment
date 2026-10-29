import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    private readonly logger = new Logger(JwtAuthGuard.name);

    handleRequest<User = unknown>(error: unknown, user: User): User {
        if (error) {
            this.logger.error(error);
            throw new UnauthorizedException();
        }

        if (!user) {
            this.logger.error('Missing user');
            throw new UnauthorizedException();
        }

        return user;
    }
}