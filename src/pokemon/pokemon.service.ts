import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Pokemon } from './entities/pokemon.entity';
import {
  BadRequestException,
  NotFoundException,
} from '@nestjs/common/exceptions';
import { CreatePokemonDto, UpdatePokemonDto } from './dto';
import { Model, isValidObjectId } from 'mongoose';

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
  ) {}

  private handleExceptions(error: any) {
    if (error.code === 11000) {
      const field = JSON.stringify(error.keyValue);
      throw new BadRequestException(`Pokemon already exists. ${field}`);
    }
    throw error;
  }

  async create(createPokemonDto: CreatePokemonDto) {
    try {
      createPokemonDto.name = createPokemonDto.name.toLowerCase();
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return {
        data: pokemon,
        message: 'Pokemon created successfully',
      };
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  findAll() {
    try {
      const pokemons = [];

      return {
        data: pokemons,
        message: 'This action returns all pokemon',
      };
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async findOne(term: string) {
    try {
      const message = `Pokemon not found with term '${term}'`;

      let pokemon: Pokemon;

      if (!isNaN(+term)) {
        pokemon = await this.pokemonModel.findOne({ no: term });
      }

      if (!pokemon && isValidObjectId(term)) {
        pokemon = await this.pokemonModel.findById(term);
      }

      if (!pokemon) {
        pokemon = await this.pokemonModel.findOne({
          name: term.trim().toLowerCase(),
        });
      }

      if (!pokemon) {
        throw new NotFoundException(message);
      }

      return {
        data: pokemon,
        message: `This action returns a pokemon`,
      };
    } catch (error) {
      throw error;
    }
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    try {
      const message = `Pokemon with id '${term}' not found for update`;

      const pokemon = await this.findOne(term);

      if (pokemon && pokemon.data) {
        const { data: pokemonInstance } = pokemon;

        if (updatePokemonDto.name) {
          updatePokemonDto.name = updatePokemonDto.name.toLowerCase();
        }

        await pokemonInstance.updateOne(updatePokemonDto);

        return {
          data: { ...pokemonInstance.toJSON(), ...updatePokemonDto },
          message: `Pokemon updated successfully`,
          term,
        };
      } else {
        throw new NotFoundException(message);
      }
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async remove(id: string) {
    try {
      const message = `Pokemon with id '${id}' not found for deletion`;
      const { deletedCount } = await this.pokemonModel.deleteOne({
        _id: id,
      });
      if (deletedCount === 0) {
        throw new BadRequestException(message);
      }
      return {
        data: {},
        id,
        message: `Pokemon deleted successfully`,
      };
    } catch (error) {
      this.handleExceptions(error);
    }
  }
}
