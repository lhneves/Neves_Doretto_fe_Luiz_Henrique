import React from 'react';
import {useNavigate} from 'react-router-dom';
import TextInput, {TextInputProps} from 'components/TextInput';
import {HeaderContainer, BackButton, Title, InputContainer} from './styles';

interface HeaderProps {
    title: string;
    showBackButton?: boolean;
    searchInput?: TextInputProps;
}

const Header = ({title, showBackButton = true, searchInput}: HeaderProps) => {
    const navigate = useNavigate();
    return (
        <HeaderContainer>
            {showBackButton && (
                <BackButton
                    onClick={() => {
                        navigate(-1);
                    }}
                >
                    <img src="/chevron-left.svg" alt="backButton" />
                </BackButton>
            )}
            <Title>{title}</Title>
            {searchInput && (
                <InputContainer>
                    <TextInput value={searchInput.value} onChange={searchInput.onChange} />
                </InputContainer>
            )}
        </HeaderContainer>
    );
};

export default Header;
