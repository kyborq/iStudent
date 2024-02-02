import * as QRCode from 'qrcode';
import { CodesGateway } from 'src/gateways/codes.gateway';

import { Injectable } from '@nestjs/common';

@Injectable()
export class CodesService {
  constructor(private codesGateway: CodesGateway) {}

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

  async saveCode(client: string) {
    this.codesGateway.notifyClientAboutSavedCode(client, {
      group: 'ДИЗАЙН-135',
      author: 'Иванов Иван',
    });
  }
}
