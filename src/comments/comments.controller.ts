import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsDto } from './comments.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}
  @Get()
  getComments() {
    return this.commentsService.getComments();
  }

  @Post()
  createComment(@Body() comment: CommentsDto) {
    return this.commentsService.createComment(comment);
  }

  @Delete('delete/:id')
  deleteComment(@Param('id') id: number) {
    return this.commentsService.deleteComment(id);
  }
}
