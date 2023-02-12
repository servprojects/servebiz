import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { User } from '@/app/user/entities/user.entity'

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    
    const ctx = GqlExecutionContext.create(context)
    // console.log(ctx.getContext().user)
    const user: User | null = ctx.getContext().user || null
    return !!user
  }
}