import React from 'react';
import {useNavigate} from 'react-router-dom';
import {HeaderContainer, BackButton, Title} from './styles';

interface HeaderProps {
    title: string;
    showBackButton?: boolean;
}

const Header = ({title, showBackButton = true}: HeaderProps) => {
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
        </HeaderContainer>
    );
};

export default Header;
