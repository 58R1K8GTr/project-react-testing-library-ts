import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import pokemonList from '../data';

// o código abaixo era para rotacionar os nomes dos pokemons, nem testei

// let count = -1;

// function rotation(reset = false) {
//   if (reset) {
//     count = -1;
//   }
//   const pokemonList = [
//     'Pikachu',
//     'Charmander',
//     'Caterpie',
//     'Ekans',
//     'Alakazam',
//     'Mew',
//     'Rapidash',
//     'Snorlax',
//     'Dragonair',
//   ];
//   count = (count + 1) % (pokemonList.length - 1);
//   return pokemonList[count];
// }

const pokemonListNames = [
  'Charmander',
  'Caterpie',
  'Ekans',
  'Alakazam',
  'Mew',
  'Rapidash',
  'Snorlax',
  'Dragonair',
];

const buttonNames = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];

describe('testando o componente pokedex', () => {
  test('testando se a página tem um h2 com um certo texto', () => {
    renderWithRouter(<App />);
    const h2 = screen.getByRole('heading', { name: /encountered pokémon/i });
    expect(h2).toBeVisible();
  });
  test('testando se é exibido o próximo pokemon da lista', () => {
    const { user } = renderWithRouter(<App />);
    pokemonListNames.forEach(async (pokemon) => {
      const nextPokemonButton = screen.getByRole('button', { name: /próximo pokémon/i });
      expect(nextPokemonButton).toHaveTextContent(/próximo pokémon/i);
      expect(nextPokemonButton).toBeVisible();
      await user.click(nextPokemonButton);
      const pokemonName = screen.getByText(pokemon);
      expect(pokemonName).toHaveTextContent(pokemon);
      expect(pokemonName).toBeVisible();
    });
    const pokemonName = screen.getByText('Pikachu');
    expect(pokemonName).toHaveTextContent('Pikachu');
    expect(pokemonName).toBeVisible();
  });
  test('testando se é mostrado apenas um pokémon por vez', () => {
    const { user } = renderWithRouter(<App />);
    pokemonListNames.forEach(async () => {
      const nextPokemonButton = screen.getByRole('button', { name: /próximo pokémon/i });
      await user.click(nextPokemonButton);
      const pokemon = screen.getByTestId('pokemon-name');
      expect(pokemon).toBeVisible();
    });
  });
  test('testando se tem um botão de filtragtem para cada tipo de pokemon', () => {
    renderWithRouter(<App />);
    const buttons = screen.getAllByTestId('pokemon-type-button');
    buttons.forEach((button) => {
      expect(buttonNames).toContain(button.textContent);
    });
    expect(buttons).length(7);
  });
  test('testando se ao selecionar um tipo, a pokédex circula somente com os pokémons daquele tipo', () => {
    const { user } = renderWithRouter(<App />);
    const pokemonsFilteredByType = pokemonList
      .reduce<{ [key: string]: string[] }>((acc, item) => {
      if (!acc[item.type]) {
        acc[item.type] = [];
      }
      acc[item.type].push(item.name);
      return acc;
    }, {});
    Object.keys(pokemonsFilteredByType).forEach(async (typePokemon: string) => {
      const button = screen.getByRole('button', { name: typePokemon });
      const buttonAll = screen.getByRole('button', { name: 'All' });
      await user.click(button);
      expect(buttonAll).toBeVisible();
      pokemonsFilteredByType[typePokemon].forEach(async (pokemonName) => {
        const pokemon = screen.getByTestId('pokemon-name');
        expect(pokemon).toHaveTextContent(pokemonName);
        if (pokemonsFilteredByType[typePokemon].length > 1) {
          const nextPokemonButton = screen.getByRole('button', { name: /próximo pokémon/i });
          await user.click(nextPokemonButton);
        }
      });
    });
  });
});
