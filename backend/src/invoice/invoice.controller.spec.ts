import { Test, TestingModule } from '@nestjs/testing';
import { InvoiceController } from './invoice.controller';
import { InvoiceService } from './invoice.service';
import { Invoice } from './invoice.entity';

describe('InvoiceController', () => {
  let controller: InvoiceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InvoiceController],
    }).compile();

    controller = module.get<InvoiceController>(InvoiceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
describe('InvoiceController', () => {
  let controller: InvoiceController;
  let service: InvoiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InvoiceController],
      providers: [
        {
          provide: InvoiceService,
          useValue: {
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<InvoiceController>(InvoiceController);
    service = module.get<InvoiceService>(InvoiceService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of invoices', async () => {
      const result: Invoice[] = [{ invoice_no: 1, total_amount: 100 } as Invoice];
      jest.spyOn(service, 'findAll').mockResolvedValue(result);

      expect(await controller.findAll(1, 10)).toBe(result);
    });

    it('should throw an error if page is not a number', async () => {
      await expect(controller.findAll('invalid' as any, 10)).rejects.toThrow(
        'Provided "skip" value is not a number. Please provide a numeric value.',
      );
    });

    it('should throw an error if limit is not a number', async () => {
      await expect(controller.findAll(1, 'invalid' as any)).rejects.toThrow(
        'Provided "skip" value is not a number. Please provide a numeric value.',
      );
    });
  });
});
