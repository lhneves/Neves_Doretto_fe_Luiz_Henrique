import React, {useState} from 'react';
import {Input, InputContainer, Label, SearchButton} from './styles';

export interface TextInputProps {
    value: string;
    onChange: (text: string) => void;
}

const TextInput = ({value, onChange}: TextInputProps) => {
    const [isActive, setIsActive] = useState(false);

    return (
        <InputContainer className="form" onClick={() => setIsActive(true)} isActive={isActive}>
            <Label htmlFor="search">
                <SearchButton type="button" data-testid="search-icon">
                    <img src="/search-icon.svg" alt="searchIcon" />
                </SearchButton>
                <Input
                    value={value}
                    onChange={e => onChange(e.target.value)}
                    className="input"
                    type="text"
                    placeholder="Search"
                    id="search"
                    data-testid="search"
                />
            </Label>
        </InputContainer>
    );
};

export default TextInput;
