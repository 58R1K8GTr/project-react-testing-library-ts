import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('testando o componente app e a rota principal', () => {
  test('testando se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
    renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: /home/i });
    const aboutLink = screen.getByRole('link', { name: /about/i });
    const favoritePokemonLink = screen.getByRole('link', { name: /favorite pokémon/i });
    expect(homeLink).toBeVisible(); // joão andrade recomendou este ao invés do toBeInTheDocument
    expect(aboutLink).toBeVisible();
    expect(favoritePokemonLink).toBeVisible();
  });
  test('testando se ao clicar na home a página é redirecionada para a página inicial', async () => {
    const { user } = renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: /home/i });
    const h2Home = screen.getByRole('heading', { level: 2, name: /Encountered Pokémon/ });
    expect(h2Home).toBeVisible();
    await user.click(homeLink);
    const h2HomeAfter = screen.getByRole('heading', { level: 2, name: /Encountered Pokémon/ });
    expect(h2HomeAfter).toBeVisible();
  });
  test('testando se ao clicar na about a página é redirecionada para essa página', async () => {
    const { user } = renderWithRouter(<App />);
    const aboutLink = screen.getByRole('link', { name: /about/i });
    await user.click(aboutLink);
    const h2AboutAfter = screen.getByRole('heading', { level: 2, name: /About Pokédex/ });
    expect(h2AboutAfter).toBeVisible();
  });
  test('testando se ao clicar no pokémon favoritados a página é redirecionada', async () => {
    const { user } = renderWithRouter(<App />);
    const favoritesLink = screen.getByRole('link', { name: /favorite pokémon/i });
    await user.click(favoritesLink);
    const h2FavoriteAfter = screen.getByRole('heading', { level: 2, name: /Favorite Pokémon/ });
    expect(h2FavoriteAfter).toBeVisible();
  });
  test('testando uma rota desconhecida', () => {
    renderWithRouter(<App />, { route: '/unknown-route' });
    const h2NotFoundAfter = screen.getByRole('heading', { name: /Page requested not found/ });
    expect(h2NotFoundAfter).toBeVisible();
  });
});
