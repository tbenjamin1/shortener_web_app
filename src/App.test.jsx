import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import App from './App';

const mockShortenUrlReducer = (state = {
  isLoading: false,
  savedUser: null, 
  shortenUrlList: [],
}, action) => {
  return state;
};

const store = configureStore({
  reducer: {
    shortenUrl: mockShortenUrlReducer 
  }
});

describe('App', () => {
  it('renders "Build stronger digital connections"', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    
    const linkElement = screen.getByText(/Build stronger digital connections/i);
    expect(linkElement).toBeInTheDocument();
  });
});
