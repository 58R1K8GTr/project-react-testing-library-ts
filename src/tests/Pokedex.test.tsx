import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import pokemonList from '../data';

const pokemonListNames = pokemonList.map((pokemon) => pokemon.name);
const buttonNames = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
const testIdPokemonName = 'pokemon-name';

describe('testando o componente pokedex', () => {
  test('testando se a página tem um h2 com um certo texto', () => {
    renderWithRouter(<App />);
    const h2 = screen.getByRole('heading', { name: /encountered pokémon/i });
    expect(h2).toBeVisible();
  });
  test('testando se é exibido o próximo pokemon da lista', async () => {
    const { user } = renderWithRouter(<App />);
    const nextPokemonButton = screen.getByRole('button', { name: /próximo pokémon/i });
    expect(nextPokemonButton).toBeVisible();
    // amaldiçoado seja o javascript que não permite um forEach nos testes.
    await user.click(nextPokemonButton);
    let renderedPokemon = screen.getByTestId(testIdPokemonName);
    expect(renderedPokemon).toHaveTextContent('Charmander');
    expect(renderedPokemon).toBeVisible();
    await user.click(nextPokemonButton);
    renderedPokemon = screen.getByTestId(testIdPokemonName);
    expect(renderedPokemon).toHaveTextContent('Caterpie');
    expect(renderedPokemon).toBeVisible();
    await user.click(nextPokemonButton);
    renderedPokemon = screen.getByTestId(testIdPokemonName);
    expect(pokemonListNames).toContain(renderedPokemon.textContent);
    expect(renderedPokemon).toBeVisible();
    await user.click(nextPokemonButton);
    renderedPokemon = screen.getByTestId(testIdPokemonName);
    expect(pokemonListNames).toContain(renderedPokemon.textContent);
    expect(renderedPokemon).toBeVisible();
    await user.click(nextPokemonButton);
    renderedPokemon = screen.getByTestId(testIdPokemonName);
    expect(pokemonListNames).toContain(renderedPokemon.textContent);
    expect(renderedPokemon).toBeVisible();
    await user.click(nextPokemonButton);
    renderedPokemon = screen.getByTestId(testIdPokemonName);
    expect(pokemonListNames).toContain(renderedPokemon.textContent);
    expect(renderedPokemon).toBeVisible();
    await user.click(nextPokemonButton);
    renderedPokemon = screen.getByTestId(testIdPokemonName);
    expect(pokemonListNames).toContain(renderedPokemon.textContent);
    expect(renderedPokemon).toBeVisible();
    await user.click(nextPokemonButton);
    renderedPokemon = screen.getByTestId(testIdPokemonName);
    expect(pokemonListNames).toContain(renderedPokemon.textContent);
    expect(renderedPokemon).toBeVisible();
    await user.click(nextPokemonButton);
    renderedPokemon = screen.getByTestId(testIdPokemonName);
    expect(pokemonListNames).toContain(renderedPokemon.textContent);
    expect(renderedPokemon).toBeVisible();
  });
  test('testando se é mostrado apenas um pokémon por vez', () => {
    const { user } = renderWithRouter(<App />);
    const nextPokemonButton = screen.getByRole('button', { name: /próximo pokémon/i });

    async function click() {
      user.click(nextPokemonButton);
    }

    pokemonListNames.forEach(async () => {
      await click();
      const pokemon = screen.getByTestId(testIdPokemonName);
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
  test('testando se ao selecionar um tipo, a pokédex circula somente com os pokémons daquele tipo', async () => {
    const { user } = renderWithRouter(<App />);
    // código refatorado pois o outro não funcionava e eu fiquei dias travado nisso.
    // fazer na mão ao invés de um forEach aqui sai mais fácil tanto pro código quanto pra mente que está cansada.
    const buttonNext = screen.getByRole('button', { name: /próximo pokémon/i });
    const buttonFilterFire = screen.getByRole('button', { name: 'Fire' });
    const buttonFilterPsychic = screen.getByRole('button', { name: 'Psychic' });
    const pokemonsPsychic = ['Alakazam', 'Mew'];
    const pokemonsFire = ['Charmander', 'Rapidash'];
    await user.click(buttonFilterPsychic);
    let renderedPokemon = screen.getByTestId(testIdPokemonName);
    expect(pokemonsPsychic).toContain(renderedPokemon.textContent);
    await user.click(buttonNext);
    renderedPokemon = screen.getByTestId(testIdPokemonName);
    expect(pokemonsPsychic).toContain(renderedPokemon.textContent);
    await user.click(buttonFilterFire);
    renderedPokemon = screen.getByTestId(testIdPokemonName);
    expect(pokemonsFire).toContain(renderedPokemon.textContent);
    await user.click(buttonNext);
    renderedPokemon = screen.getByTestId(testIdPokemonName);
    expect(pokemonsFire).toContain(renderedPokemon.textContent);
  });
  test('testando se o botão All é clicável', async () => {
    const { user } = renderWithRouter(<App />);
    const buttonAll = screen.getByRole('button', { name: 'All' });
    const buttonFilter = screen.getByRole('button', { name: 'Fire' });
    let renderedPokemon = screen.getByTestId(testIdPokemonName);
    const pokemonName = 'Pikachu';
    expect(renderedPokemon).toHaveTextContent(pokemonName);
    await user.click(buttonFilter);
    renderedPokemon = screen.getByTestId(testIdPokemonName);
    expect(renderedPokemon).not.toHaveTextContent(pokemonName);
    await user.click(buttonAll);
    renderedPokemon = screen.getByTestId(testIdPokemonName);
    expect(renderedPokemon).toHaveTextContent(pokemonName);
  });
});
