import React from 'react';
import {ITeam} from 'types';

import useSWR from 'swr';
import {getData} from '../api';

import Header from '../components/Header';
import List from '../components/List';
import {Container} from '../components/GlobalComponents';

const Teams = () => {
    const {data: teams, isLoading} = useSWR<ITeam[]>('teams', getData);

    const formatTeamsToCards = (teamList: ITeam[]) => {
        if (teamList === undefined) {
            return [];
        }

        return teamList.map(team => {
            return {
                id: team.id,
                title: 'Team Name',
                name: team.name,
                navigateTo: `/team/${team.id}`,
                navigationProps: team,
            };
        });
    };

    return (
        <Container>
            <Header title="Teams" showBackButton={false} />
            <List items={formatTeamsToCards(teams)} isLoading={isLoading} />
        </Container>
    );
};

export default Teams;
