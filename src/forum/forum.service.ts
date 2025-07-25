import { Injectable } from '@nestjs/common';
import { ForumDto } from './forum.dto';
import { ForumEntity } from './forum.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ForumService {
  constructor(
    @InjectRepository(ForumEntity)
    private forumRepository: Repository<ForumEntity>,
  ) {}

  async saveNewMessage(message: ForumDto) {
    const newMessage = await this.forumRepository.create({ ...message });
    return await this.forumRepository.save(newMessage);
  }

  async getAllMessages(): Promise<ForumEntity[]> {
    return await this.forumRepository.find();
  }
}
