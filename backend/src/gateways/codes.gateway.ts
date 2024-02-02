import { Server, Socket } from 'socket.io';

import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

@WebSocketGateway({ cors: { origin: '*' }, namespace: 'codes' })
export class CodesGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private clients = new Map<string, Socket>();

  handleConnection(client: Socket, ...args: any[]) {
    this.clients.set(client.id, client);
  }

  handleDisconnect(client: Socket) {
    this.clients.delete(client.id);
  }

  notifyClientAboutSavedCode(clientId: string, data: any) {
    const client = this.clients.get(clientId);
    if (client) {
      client.emit('codeSaved', data);
    } else {
      console.log(`Client ${clientId} not found.`);
    }
  }
}
