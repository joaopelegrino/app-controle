import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import AreaCard from '../../components/AreaCard';

describe('AreaCard Component', () => {
  const defaultProps = {
    title: 'Test Area',
    icon: '🎯',
    description: 'Test description',
    modules: 10,
    cards: 20,
    hours: 30,
    onClick: vi.fn()
  };

  it('renders with default props', () => {
    render(<AreaCard {...defaultProps} />);
    
    expect(screen.getByText('Test Area')).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();
    expect(screen.getByText('10 módulos')).toBeInTheDocument();
    expect(screen.getByText('20 cards')).toBeInTheDocument();
    expect(screen.getByText('30h')).toBeInTheDocument();
  });

  it('handles click events', () => {
    const handleClick = vi.fn();
    render(<AreaCard {...defaultProps} onClick={handleClick} />);
    
    const card = screen.getByText('Test Area').closest('div');
    fireEvent.click(card);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders with integrated badge', () => {
    render(<AreaCard {...defaultProps} badge="integrated" />);
    expect(screen.getByText('Integrado')).toBeInTheDocument();
  });

  it('renders with new badge', () => {
    render(<AreaCard {...defaultProps} badge="new" />);
    expect(screen.getByText('Novo')).toBeInTheDocument();
  });

  it('renders learning-path variant correctly', () => {
    render(<AreaCard {...defaultProps} variant="learning-path" />);
    
    const card = screen.getByText('Test Area').closest('div');
    expect(card).toHaveClass('from-purple-600', 'to-blue-600');
  });

  it('renders with preview content', () => {
    const preview = {
      items: ['Preview 1', 'Preview 2', 'Preview 3'],
      total: 5
    };
    
    render(<AreaCard {...defaultProps} preview={preview} />);
    
    expect(screen.getByText('Preview 1')).toBeInTheDocument();
    expect(screen.getByText('Preview 2')).toBeInTheDocument();
    expect(screen.getByText('+3 flashcards adicionais')).toBeInTheDocument();
  });

  it('renders rust-special variant with system integration', () => {
    render(
      <AreaCard 
        {...defaultProps} 
        variant="rust-special"
        isSystemIntegrated={true}
        sequenceNumber={3}
      />
    );
    
    expect(screen.getByText('🚀 Sistema')).toBeInTheDocument();
    expect(screen.getByText('🚀 Sistema Integrado')).toBeInTheDocument();
    expect(screen.getByText('Área 3')).toBeInTheDocument();
  });

  it('renders path-area variant with sequence number', () => {
    render(
      <AreaCard 
        {...defaultProps} 
        variant="path-area"
        sequenceNumber={1}
      />
    );
    
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('⏱️ Estudar')).toBeInTheDocument();
  });
});