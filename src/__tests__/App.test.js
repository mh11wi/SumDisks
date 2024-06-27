import { render, screen, fireEvent } from '@testing-library/react';
import App from 'src/App';

window.adConfig = vi.fn();

test('The help menu displays on load', () => {
  render(<App />);
  const dialog = screen.getByRole('dialog', { name: /How To Play/i });
  expect(dialog).toBeInTheDocument();
});

test('There is an app bar with the title', async () => {
  render(<App />);
  const dialogClose = screen.getByRole('button', { name: /Close/i });
  fireEvent.click(dialogClose);
  const heading = await screen.findByRole('heading', { name: /Sum Disks/i });
  expect(heading).toBeInTheDocument();
});

test('There is at least one disk', async () => {
  render(<App />);
  const dialogClose = screen.getByRole('button', { name: /Close/i });
  fireEvent.click(dialogClose);
  const disk = await screen.findByRole('button', { name: /disk 1/i });
  expect(disk).toBeInTheDocument();
});
