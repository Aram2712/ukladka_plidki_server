import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessageService } from './message.service';

@WebSocketGateway({ cors: { origin: '*' } })
export class MessageGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  constructor(private chatService: MessageService) {}

  async handleConnection(client: Socket) {
    const userId = client.handshake.query.userId as string;
    if (!userId) return client.disconnect();
    await client.join(userId);
    const history = await this.chatService.getDialog(userId);
    client.emit('chatHistory', history);
  }

  handleDisconnect(client: Socket) {
    const userId = client.handshake.query.userId;
  }

  @SubscribeMessage('sendMessage')
  async handleMessage(
    @MessageBody()
    data: { text: string; user: string; senderId: string; receiverId: string },
    @ConnectedSocket() client: Socket,
  ) {
    const saved = await this.chatService.saveMessage(data);
    this.server.to(data.receiverId).emit('receiveMessage', saved);
    if (data.senderId !== data.receiverId) {
      client.emit('receiveMessage', saved);
    }
  }
}
