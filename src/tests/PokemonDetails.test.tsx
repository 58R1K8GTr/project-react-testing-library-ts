import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

const route = '/pokemon/25';

describe('testando o componente PokemonDetails', () => {
  test('testando se as informações detalhadas são  mostradas na tela', () => {
    renderWithRouter(<App />, { route });
    const details = screen.getByRole('heading', { level: 2, name: 'Pikachu Details' });
    expect(details).toBeVisible();
    const linkDetails = screen.queryByRole('link', { name: /more details/i });
    expect(linkDetails).toBeNull();
    const summary = screen.getByRole('heading', { level: 2, name: 'Summary' });
    expect(summary).toBeVisible();
    const summaryP = screen.getByText(/to make them tender enough to eat\./);
    expect(summaryP).toBeVisible();
  });
  test('testando se existe na página uma seção com os mapas contendo as localizações dos pokémons', () => {
    renderWithRouter(<App />, { route });
    const locationPokemonH2 = screen.getByRole('heading', { level: 2, name: /Game Locations of/i });
    expect(locationPokemonH2).toBeVisible();
    const imgs = screen.getAllByRole('img', { name: 'Pikachu location' }) as HTMLImageElement[];
    expect(imgs).toHaveLength(2);
    expect(imgs[0].src).toBe('https://archives.bulbagarden.net/media/upload/0/08/Kanto_Route_2_Map.png');
    expect(imgs[1].src).toBe('https://archives.bulbagarden.net/media/upload/b/bd/Kanto_Celadon_City_Map.png');
    const em1 = screen.getByText('Kanto Viridian Forest');
    const em2 = screen.getByText('Kanto Power Plant');
    expect(em1).toBeVisible();
    expect(em2).toBeVisible();
  });
  test('testando se o usuário pode favoritar um pokémon por meio da página de detalhes', async () => {
    const { user } = renderWithRouter(<App />, { route });
    const favoriteInput = screen.getByLabelText('Pokémon favoritado?');
    expect(favoriteInput).toBeVisible();
    let img = screen.queryByRole('img', { name: 'Pikachu is marked as favorite' }) as HTMLImageElement | null;
    expect(img).toBeNull();
    await user.click(favoriteInput);
    img = screen.queryByRole('img', { name: 'Pikachu is marked as favorite' });
    expect(img).toBeVisible();
  });
});
