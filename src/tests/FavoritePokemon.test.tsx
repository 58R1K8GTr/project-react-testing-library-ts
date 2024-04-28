import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('testando o componente FavoritePokemon', () => {
  test('testando se não há pokémons favoritos caso nenhum seja favoritado', () => {
    renderWithRouter(<App />, { route: '/favorites' });
    const noFavorite = screen.getByText('No favorite Pokémon found');
    expect(noFavorite).toBeVisible();
  });
  test('testando se favoritar um pokemon, ele irá aparecer nos favoritos', async () => {
    const { user } = renderWithRouter(<App />, { route: '/pokemon/25' });
    const inputFavorite = screen.getByLabelText(/Pokémon favoritado\?/);
    const favoriteLink = screen.getByRole('link', { name: /favorite pokémon/i });
    await user.click(inputFavorite);
    await user.click(favoriteLink);
    const pikachu = screen.getByTestId('pokemon-name');
    expect(pikachu).toBeVisible();
    expect(pikachu.textContent).toBe('Pikachu');
  });
});
