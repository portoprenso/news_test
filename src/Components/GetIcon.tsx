import React from 'react';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import SportsHockeyIcon from '@mui/icons-material/SportsHockey';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import SportsTennisIcon from '@mui/icons-material/SportsTennis';
import SportsMartialArtsIcon from '@mui/icons-material/SportsMartialArts';
import PeopleIcon from '@mui/icons-material/People';

interface IGetIcon {
  tags: string[];
}

const GetIcon = (props: IGetIcon) => {
  const { tags } = props;
  if (!tags) return <PeopleIcon />;
  for (const tag of tags) {
    switch (tag) {
      case '7b76b6f8-a6f8-48f1-b74a-48d77f869f56': {
        return <SportsSoccerIcon />;
      }
      case 'b0261701-9b73-431b-81b0-abb9d360d675': {
        return <SportsHockeyIcon />;
      }
      case '44f28035-788d-4e2b-8ce0-55adee8a6f62': {
        return <SportsBasketballIcon />;
      }
      case 'c371643c-0161-45e6-9da0-213d78a51f12': {
        return <SportsEsportsIcon />;
      }
      case 'f7f9b1c5-7c68-487a-94d1-da66654c5092': {
        return <SportsTennisIcon />;
      }
      case '2f5c6e67-b280-47d7-b8d4-e658d3214597': {
        return <SportsMartialArtsIcon />;
      }
      default: return <PeopleIcon />;
    }
  }
  return (<PeopleIcon />)
}

export default GetIcon;