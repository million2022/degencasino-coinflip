import { render, screen } from '@testing-library/react';
import App from './App';

test('renders for degencasino-coinflip link', () => {
  render(<App />);
  const linkElement = screen.getByText(/degencasino-coinflip/i);
  expect(linkElement).toBeInTheDocument();
});
