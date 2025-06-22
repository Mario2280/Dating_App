import { Injectable } from '@nestjs/common';
import { PrismaService } from '@services/prisma.service';
import { PaymentCreateDto } from '@validation/payment';
import { PaymentUpdateDto } from '@validation/payment';

@Injectable()
export class PaymentService {
  constructor(private prisma: PrismaService) {}

  async create(createDto: PaymentCreateDto) {
    //return this.prisma.payment.create({
    //  data: {
    //    ...createDto,
    //    user_id: BigInt(createDto.user_id),
    //  },
    //});
  }

  async findAll() {
    return this.prisma.payment.findMany();
  }

  async findOne(id: string) {
    return this.prisma.payment.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateDto: PaymentUpdateDto) {
    return this.prisma.payment.update({
      where: { id },
      data: {
        ...updateDto,
      },
    });
  }

  async remove(id: string) {
    return this.prisma.payment.delete({
      where: { id },
    });
  }
}
