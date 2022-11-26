import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the Sum Disks app bar', () => {
  render(<App />);
  const element = screen.getByText(/Sum Disks/i);
  expect(element).toBeInTheDocument();
});
