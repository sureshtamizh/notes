import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import App from '../App';


// Mock the lazy-loaded component
jest.mock('./src/screens/NotesDetails', () => {
  return () => <></>; // Return a mock component for the test
});

describe('App Navigation', () => {
  it('should render Home screen initially', () => {
    render(
      <NavigationContainer>
        <App />
      </NavigationContainer>
    );

    // Ensure that something from the Home screen is visible (replace with actual text from your Home screen)
    expect(screen.getByText('Home Screen Text')).toBeTruthy(); // Replace with real text in your Home screen
  });

  it('should navigate to NoteDetails screen when navigating', async () => {
    render(
      <NavigationContainer>
        <App />
      </NavigationContainer>
    );

    // Simulate a navigation action. You can use fireEvent or screen methods.
    const navigateButton = screen.getByText('Go to Note Details'); // Replace with your button or action trigger
    fireEvent.press(navigateButton);

    // Wait for the NoteDetails screen to appear
    await waitFor(() => {
      expect(screen.getByText('Note Details Screen')).toBeTruthy(); // Replace with actual text from the NoteDetails screen
    });
  });
});
