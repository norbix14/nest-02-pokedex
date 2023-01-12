import { CommonModule } from './common/common.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PokemonModule } from './pokemon/pokemon.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

const MONGO_URL =
  process.env.MONGO_URL || 'mongodb://localhost:27017/fhnestpokedex';

@Module({
  controllers: [],
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    MongooseModule.forRoot(MONGO_URL),
    PokemonModule,
    CommonModule,
  ],
  providers: [],
})
export class AppModule {}
