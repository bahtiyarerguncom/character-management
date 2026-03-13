import { Resolver, Query, Args } from '@nestjs/graphql';
import { Character } from './character.model';
import { CharacterService } from './character.service';
import { CharacterFilterInput } from './dto/character-filter.input';

@Resolver(() => Character)
export class CharacterResolver {
  constructor(private characterService: CharacterService) {}

  // tek query yeterli şimdilik — ileride getCharacterById eklenebilir
  @Query(() => [Character], { name: 'characters' })
  async getCharacters(
    @Args('filter', { nullable: true }) filter?: CharacterFilterInput,
  ) {
    return this.characterService.findAll(filter);
  }
}
