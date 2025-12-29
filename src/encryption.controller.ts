import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { EncryptionService } from './encryption.service';
import { ApiTags, ApiProperty, ApiOperation } from '@nestjs/swagger'; // รวม Import ไว้ที่เดียว

// --- DTO for encryption ---
class EncryptRequestDto {
    @ApiProperty({
        description: 'ข้อความที่ต้องการเข้ารหัส (0-2000 characters)',
        example: 'Hello NestJS'
    })
    payload: string;
}

// --- DTO for decryption ---
class DecryptRequestDto {
    @ApiProperty({ description: 'ข้อมูลส่วนที่ 1 (Encrypted AES Key)' })
    data1: string;
    @ApiProperty({ description: 'ข้อมูลส่วนที่ 2 (Encrypted Payload)' })
    data2: string;
}

@ApiTags('Encryption')
@Controller()
export class EncryptionController {
    constructor(private readonly service: EncryptionService) { }

    @Post('get-encrypt-data')
    @ApiOperation({ summary: 'Hybrid data encryption (AES + RSA)' })
    encrypt(@Body() body: EncryptRequestDto) {
        if (!body || body.payload === undefined) {
            throw new BadRequestException('Request body must contain payload');
        }

        if (body.payload.length > 2000) {
            throw new BadRequestException('Payload too long (limit 2000 characters)');
        }

        const result = this.service.encrypt(body.payload);
        return { successful: true, error_code: '0', data: result };
    }

    @Post('get-decrypt-data')
    @ApiOperation({ summary: 'Decoded data and restored to the original payload.' })
    decrypt(@Body() body: DecryptRequestDto) {
        if (!body.data1 || !body.data2) {
            throw new BadRequestException('data1 and data2 are required');
        }

        const payload = this.service.decrypt(body.data1, body.data2);
        return { successful: true, error_code: '0', data: { payload } };
    }
}