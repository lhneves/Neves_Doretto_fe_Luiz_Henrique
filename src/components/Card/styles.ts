import styled from 'styled-components';

export const Container = styled.div<{navigateTo: boolean}>`
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 0.8rem 2rem;
    gap: 1rem;
    flex-shrink: 0;
    width: 250px;
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.3);
    background: #5a6af9;
    box-shadow: 0px 4px 14px 0px #5a6af9;
    color: white;
    cursor: ${props => (props.navigateTo ? 'pointer' : 'default')};
`;

export const Title = styled.h3`
    color: #fff;
    text-align: center;
    font-size: 1rem;
    font-family: Inter;
    font-weight: 600;
`;

export const InfoText = styled.p`
    color: #fff;
    text-align: center;
    font-size: 1rem;
    font-family: Inter;
`;
