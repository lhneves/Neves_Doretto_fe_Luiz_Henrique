import styled from 'styled-components';

export const InputContainer = styled.div<{isActive: boolean}>`
    cursor: pointer;
    font-family: sans-serif;
    background-color: #283542;
    border-radius: 30px;
    width: 100%;
    height: 40px;
    border: 2px solid #1e33ef;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 8px;
    transition: width 0.4s;

    @media (max-width: 936px) {
        width: 40px;
        height: 30px;

        &:focus-within {
            width: 150px;
        }
    }
`;

export const Label = styled.label`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
`;

export const SearchButton = styled.button`
    display: flex;
    transition: 0.2s linear;

    & > img {
        padding: 0 20px;
        height: 20px;
        width: 20px;
        filter: invert(68%) sepia(9%) saturate(408%) hue-rotate(169deg) brightness(92%)
            contrast(85%);
    }
`;

export const Input = styled.input`
    color: #fff;
    width: 100%;
    background: none;
    border: none;

    &:focus {
        outline: none;
    }

    &::placeholder {
        color: #949faa;
    }
`;
