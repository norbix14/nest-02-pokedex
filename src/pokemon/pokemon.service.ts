import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common/exceptions';
import { CreatePokemonDto, UpdatePokemonDto } from './dto';

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
  ) {}

  async create(createPokemonDto: CreatePokemonDto) {
    try {
      createPokemonDto.name = createPokemonDto.name.toLowerCase();
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return {
        data: pokemon,
        message: 'Pokemon created successfully',
      };
    } catch (error) {
      if (error.code === 11000) {
        const field = JSON.stringify(error.keyValue);
        throw new BadRequestException(`Pokemon already exists. ${field}`);
      }
      throw new InternalServerErrorException(
        `Error creating pokemon. Check system logs`,
      );
    }
  }

  findAll() {
    return {
      data: [],
      message: 'This action returns all pokemon',
    };
  }

  findOne(id: number) {
    const data = {};
    return {
      data,
      message: `This action returns a #${id} pokemon`,
    };
  }

  update(id: number, updatePokemonDto: UpdatePokemonDto) {
    return {
      data: updatePokemonDto,
      message: `Pokemon #${id} updated successfully`,
    };
  }

  remove(id: number) {
    const data = {};
    return {
      data,
      message: `Pokemon #${id} removed successfully`,
    };
  }
}
