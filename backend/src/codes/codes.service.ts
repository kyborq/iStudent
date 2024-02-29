import * as QRCode from 'qrcode';
import { CodesGateway } from 'src/gateways/codes.gateway';
import { GroupsService } from 'src/groups/groups.service';
import { UsersService } from 'src/users/users.service';

import { Injectable } from '@nestjs/common';

@Injectable()
export class CodesService {
  constructor(
    private codesGateway: CodesGateway,
    private usersService: UsersService,
    private groupsService: GroupsService,
  ) {}

  private randomChar = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    return chars.charAt(Math.floor(Math.random() * chars.length));
  };

  private generatePart = () => {
    let part = '';
    for (let i = 0; i < 5; i++) {
      part += this.randomChar();
    }
    return part;
  };

  private generateString() {
    return `${this.generatePart()}-${this.generatePart()}-${this.generatePart()}`;
  }

  async generateCode(client: string) {
    const randomString = this.generateString();
    const qrCodeDataURL = await QRCode.toDataURL(`${client}:${randomString}`, {
      scale: 8,
    });

    return {
      connection: client,
      code: randomString,
      qr: qrCodeDataURL,
    };
  }

  async saveCode(client: string, prefectId: string) {
    const user = await this.usersService.getUserById(prefectId);
    const group = await this.groupsService.getGroupById(user.groupId);

    this.codesGateway.notifyClientAboutSavedCode(client, {
      groupId: group.id,
      group: group.name,
      author: user.name,
    });
  }
}
