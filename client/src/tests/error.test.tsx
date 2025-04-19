import { render, screen } from '@testing-library/react';
import Error from '../components/Error'; // ajusta el path si es necesario

describe('Error component', () => {
  it('renders the error message passed as children', () => {
    render(<Error>Campo requerido</Error>);

    const errorText = screen.getByText(/campo requerido/i);

    expect(errorText).toBeInTheDocument();
    expect(errorText).toHaveClass('text-red-600');
    expect(errorText.tagName).toBe('SPAN');
  });
});
