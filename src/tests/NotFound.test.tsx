import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

beforeEach(() => {
  renderWithRouter(<App />, { route: '/digimon' });
});

describe('testando o componente NotFound', () => {
  test('testando se a página contém um h2 com um certo texto', () => {
    const h2NotFound = screen.getByRole('heading', { name: /page requested not found/i });
    expect(h2NotFound).toBeVisible();
  });
  test('testando se a página mostra a imagem com o texto alternativo', () => {
    const img = screen.getByRole('img', { name: /Clefairy pushing buttons randomly with text I have no idea what i'm doing/ });
    expect(img).toBeVisible();
  });
});
