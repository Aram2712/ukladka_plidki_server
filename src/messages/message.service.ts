import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageEntity } from './message.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MessageService {
    constructor(
        @InjectRepository(MessageEntity)
        private readonly messageRepo: Repository<MessageEntity>,
    ) {}

    async saveMessage(data: { senderId: string; user: string, receiverId: string; text: string }) {
        const message = this.messageRepo.create(data);
        return this.messageRepo.save(message);
    }

    async getDialog(userId: string): Promise<MessageEntity[]> {
        return this.messageRepo.find({
            where: [
                { senderId: userId },
                { receiverId: userId },
            ],
            order: { timestamp: 'ASC' },
        });
    }
}