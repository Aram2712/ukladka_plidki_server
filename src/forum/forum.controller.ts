import { Body, Controller, Get, Post } from '@nestjs/common';
import { ForumService } from './forum.service';
import { ForumDto } from './forum.dto';

@Controller('forum')
export class ForumController {
  constructor(private readonly forumService: ForumService) {}

  @Get()
  getAllMessages() {
    return this.forumService.getAllMessages();
  }

  @Post('create')
  saveMessage(@Body() message: ForumDto) {
    return this.forumService.saveNewMessage(message);
  }
}
