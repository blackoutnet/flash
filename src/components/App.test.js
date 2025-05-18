import { render, screen } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import App from './App.svelte';

describe('App', () => {
  it('renders without crashing', () => {
    render(App);
    expect(screen.getByText('flash.comma.ai')).toBeInTheDocument();
  });
});
