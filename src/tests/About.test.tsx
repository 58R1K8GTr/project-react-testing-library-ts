import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

beforeEach(() => {
  renderWithRouter(<App />, { route: '/About' });
});

describe('testando a rota about', () => {
  test('testando se a página contém algum elemento que deveria ter', () => {
    const h3Title = screen.getByRole('heading', { name: /What does this app do\?/ });
    expect(h3Title).toBeVisible();
  });
  test('testando se a página contém um h2 com o texto correto', () => {
    const h2About = screen.getByRole('heading', { level: 2, name: /about pokédex/i });
    expect(h2About).toBeVisible();
  });
  test('testando se a página contém dois parágrafos', () => {
    const p1 = screen.getByText(/This application simulates a Pokédex/);
    const p2 = screen.getByText(/One can filter Pokémon by type/);
    expect(p1).toBeVisible();
    expect(p2).toBeVisible();
  });
  test('testando se a página contém uma imagem correta', () => {
    const img = screen.getByRole('img', { name: /pokédex/i }) as HTMLImageElement;
    expect(img).toBeVisible();
    expect(img.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
