import { Injectable, Logger } from '@nestjs/common';
import { CreateUserRequest } from './dto/createUser.request';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { UserCreatedEvent } from './events/user-create.event';

@Injectable()
export class AppService {
  constructor(private readonly eventEmitter: EventEmitter2) {}
  private readonly logger = new Logger(AppService.name);
  getHello(): string {
    return 'Hello World!';
  }

  createUser(body: CreateUserRequest) {
    this.logger.log('Create user', body);
    this.eventEmitter.emit(
      'create.user',
      new UserCreatedEvent('1233', body.email),
    );
  }

  @OnEvent('create.user')
  handleCreateUserEvent(payload: UserCreatedEvent) {
    this.logger.log('Welcome new user', payload.userId);
  }

  @OnEvent('create.user', { async: true })
  handleAnotherCreateUserEvent(payload: UserCreatedEvent) {
    this.logger.log(`Gift send to ${payload.email}`);
  }
}
