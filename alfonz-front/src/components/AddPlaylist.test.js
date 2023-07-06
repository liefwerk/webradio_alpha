import { render, screen } from '@testing-library/react';
import AddPlaylist from './AddPlaylist';

test('renders add playlist button', () => {
  render(<AddPlaylist />);
  const buttonElement = screen.getByText(/Add playlist/i);
  expect(buttonElement).toBeInTheDocument();
});
