import { Injectable } from '@nestjs/common';
import * as QRCode from 'qrcode';

@Injectable()
export class CodesService {
  private generateString() {
    const randomChar = () => {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      return chars.charAt(Math.floor(Math.random() * chars.length));
    };

    const generatePart = () => {
      let part = '';
      for (let i = 0; i < 5; i++) {
        part += randomChar();
      }
      return part;
    };

    return `${generatePart()}-${generatePart()}-${generatePart()}`;
  }

  async generateCode() {
    const randomString = this.generateString();
    const qrCodeDataURL = await QRCode.toDataURL(randomString);

    return {
      code: randomString,
      qr: qrCodeDataURL,
    };
  }
}
