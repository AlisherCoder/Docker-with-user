import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'Alex' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 20 })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  age: number;
}
