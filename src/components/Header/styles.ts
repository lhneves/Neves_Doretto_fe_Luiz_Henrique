import styled from 'styled-components';

export const HeaderContainer = styled.div`
    position: relative;
    width: 100%;
    height: 8vh;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #5a6af9;
    color: white;
`;

export const Title = styled.h1`
    width: 100%;
    text-align: center;

    @media (max-width: 768px) {
        font-size: 22px;
    }
`;

export const BackButton = styled.button`
    left: 10px;
    position: absolute;
    cursor: pointer;
    background-color: transparent;
    border: none;

    & > img {
        @media (max-width: 768px) {
            width: 40px;
            height: 40px;
        }
        width: 50px;
        height: 50px;
        outline: 0;
    }
`;

export const InputContainer = styled.div`
    right: 40px;
    position: absolute;
`;
