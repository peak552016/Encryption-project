import { Test, TestingModule } from '@nestjs/testing';
import { EncryptionService } from '../src/encryption.service'; 
import { ConfigModule } from '@nestjs/config';

describe('EncryptionService', () => {
  let service: EncryptionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: '.env', 
        }),
      ],
      providers: [EncryptionService],
    }).compile();

    service = module.get<EncryptionService>(EncryptionService);
  });

  it('ควรจะถอดรหัสออกมาได้ข้อความเดิม (Hybrid Encryption Check)', () => {
    const payload = "Hello NestJS Test Message";
    
    const encrypted = service.encrypt(payload);
    expect(encrypted.data1).toBeDefined();
    expect(encrypted.data2).toBeDefined();

    const decrypted = service.decrypt(encrypted.data1, encrypted.data2);
    expect(decrypted).toBe(payload);
  });
});