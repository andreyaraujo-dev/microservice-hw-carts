import { Module } from '@nestjs/common'
import { JwtStrategy } from './jwt.strategy'
import { JwtModule } from '@nestjs/jwt'
import { ConstantKeys } from '../shared/config/constant-keys.enum'
import { PassportModule } from '@nestjs/passport'
import { JwtAuthGuard } from './jwt-auth.guard'

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConstantKeys.jwtSecret],
      useFactory: async (jwtSecret: string) => ({
        global: true,
        secret: jwtSecret
      })
    })
  ],
  exports: [],
  providers: [JwtStrategy, JwtAuthGuard]
})
export class AuthModule {}
