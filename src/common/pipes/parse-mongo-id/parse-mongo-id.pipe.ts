import { isValidObjectId } from 'mongoose';
import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ParseMongoIdPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    // useful for more validation
    // const { data, metatype, type } = metadata;
    if (!isValidObjectId(value)) {
      throw new BadRequestException(`Invalid MongoId '${value}'`);
    }
    return value;
  }
}
