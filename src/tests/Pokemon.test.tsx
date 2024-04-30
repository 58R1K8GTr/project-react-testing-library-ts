import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

const testIdPokemonName = 'pokemon-name';
const testIdPokemonType = 'pokemon-type';
const testIdPokemonWeight = 'pokemon-weight';

describe('testando o componente Pokemon', () => {
  test('Teste se é renderizado um card com as informações de determinado Pokémon', () => {
    renderWithRouter(<App />, { route: '/pokemon/25' });
    const pokemonName = screen.getByTestId(testIdPokemonName);
    expect(pokemonName).toBeVisible();
    expect(pokemonName).toHaveTextContent('Pikachu');
    const pokemonType = screen.getByTestId(testIdPokemonType);
    expect(pokemonType).toBeVisible();
    expect(pokemonType).toHaveTextContent('Electric');
    const pokemonWeight = screen.getByTestId(testIdPokemonWeight);
    expect(pokemonWeight).toBeVisible();
    expect(pokemonWeight).toHaveTextContent('Average weight: 6.0 kg');
    const pokemonImage = screen.getByAltText('Pikachu sprite') as HTMLImageElement;
    expect(pokemonImage).toBeVisible();
    expect(pokemonImage.src).toBe('https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png');
  });
  test('testando se ao clicar no link de navegação do pokémon, é feito o redirecionamento da aplicação', () => {
    renderWithRouter(<App />);
    const linkDetails = screen.getByRole('link', { name: /more details/i });
    expect(linkDetails.getAttribute('href')).toBe('/pokemon/25');
  });
  test('testando se ao clicar no link more details a página é redirecionada', async () => {
    const { user } = renderWithRouter(<App />);
    const linkDetails = screen.getByRole('link', { name: /more details/i });
    await user.click(linkDetails);
    const h2 = screen.getByRole('heading', { level: 2, name: 'Pikachu Details' });
    expect(h2).toBeVisible();
  });
  test('testando se a url também muda para a rota do link more details', async () => {
    const { user } = renderWithRouter(<App />);
    const linkDetails = screen.getByRole('link', { name: /more details/i });
    await user.click(linkDetails);
    expect(window.location.pathname).toBe('/pokemon/25');
  });
  test('testando se existe uma estrela nos pokémons favoritados', async () => {
    const { user } = renderWithRouter(<App />);
    const moreDetailsLink = screen.getByRole('link', { name: /more details/i });
    await user.click(moreDetailsLink);
    const favoritePokemonInput = screen.getByLabelText('Pokémon favoritado?');
    await user.click(favoritePokemonInput);
    const favoriteIcon = screen.getByAltText('Pikachu is marked as favorite') as HTMLImageElement;
    expect(favoriteIcon.src).toBe('http://localhost:3000/star-icon.png');
  });
});
