import { User } from '@/app/user/entities/user.entity';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
// export class AuthGuard extends AuthGuard('jwt'){
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);
    
    if (isPublic) {
      return true;
    }

    const ctx = GqlExecutionContext.create(context);
    // console.log(ctx.getContext().user)
    const user: User | null = ctx.getContext().user || null;
    return !!user;

  }
}
