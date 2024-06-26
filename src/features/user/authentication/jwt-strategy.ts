import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt, VerifiedCallback } from 'passport-jwt';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../user.service';
export interface JwtPayload {
    email: string;
    iat?: Date;
}
@Injectable()

export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly usersService: UserService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'jwtPrivateKey',
        });
    }

    async validate(payload: JwtPayload, done: VerifiedCallback) {
        const user = await this.usersService.getUserByEmail(payload.email);
        if (!user) {
            return done(new HttpException({}, HttpStatus.UNAUTHORIZED), false);
        }

        return done(null, user, payload.iat);
    }
}
