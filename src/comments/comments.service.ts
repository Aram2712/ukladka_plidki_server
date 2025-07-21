
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommentsDto } from "./comments.dto";
import { CommentsEntity } from "./comments.entity";

@Injectable()
export class CommentsService {
    constructor(@InjectRepository(CommentsEntity) private readonly commentsRepository: Repository<CommentsEntity>) {}

    async createComment(comment: CommentsDto) {
        const newComment = this.commentsRepository.create({...comment});
        await this.commentsRepository.save(newComment);
    }

    async getComments(): Promise<CommentsEntity[]> {
        return (await this.commentsRepository.find()).reverse();
    }

    async deleteComment(id: number): Promise<void> {
        await this.commentsRepository.delete(id);
    }
}
