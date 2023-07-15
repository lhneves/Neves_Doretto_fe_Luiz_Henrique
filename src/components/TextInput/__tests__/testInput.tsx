import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import TextInput from '..';

const mockUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockUseNavigate,
}));

describe('TextInput', () => {
    const renderTextInput = ({value, onChange}) =>
        render(<TextInput value={value} onChange={onChange} />);

    it('should render TextInput', () => {
        const mockedOnChange = jest.fn();
        renderTextInput({value: '', onChange: mockedOnChange});

        expect(screen.getByTestId('search-icon')).toBeInTheDocument();
        expect(screen.getByTestId('search')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
    });

    it('should handle the input change', () => {
        const mockedOnChange = jest.fn();
        renderTextInput({value: '', onChange: mockedOnChange});

        const input = screen.getByTestId('search');
        fireEvent.change(input, {target: {value: 'test'}});
        expect(mockedOnChange).toHaveBeenCalledWith('test');
    });
});
