import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';

@Injectable()
export class EncryptionService {
  private privKey: string;
  private pubKey: string;

  constructor(private configService: ConfigService) {
  this.privKey = this.configService.get<string>('RSA_PRIVATE_KEY') || '';
  this.pubKey = this.configService.get<string>('RSA_PUBLIC_KEY') || '';
}

  encrypt(payload: string) {
    const aesKey = crypto.randomBytes(32); 
    const iv = crypto.randomBytes(16);

    const cipher = crypto.createCipheriv('aes-256-cbc', aesKey, iv);
    let data2 = cipher.update(payload, 'utf8', 'base64');
    data2 += cipher.final('base64');


    const data1 = crypto.privateEncrypt(this.privKey, Buffer.concat([aesKey, iv])).toString('base64');
    return { data1, data2 };
  }

  decrypt(data1: string, data2: string) {
    const buffer = crypto.publicDecrypt(this.pubKey!, Buffer.from(data1, 'base64'));
    const aesKey = buffer.subarray(0, 32);
    const iv = buffer.subarray(32, 48);

    const decipher = crypto.createDecipheriv('aes-256-cbc', aesKey, iv);
    let payload = decipher.update(data2, 'base64', 'utf8');
    payload += decipher.final('utf8');

    return payload;
  }
}