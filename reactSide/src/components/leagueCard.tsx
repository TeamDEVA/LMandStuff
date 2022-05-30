import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from 'react';
const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

const LeagueCard = (props: any) => {
  let league = props.league;
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          League ID: {parseInt(league.leagueId._hex)}
        </Typography>
        <Typography variant="h5" component="div">
          Live in: {parseInt(league.liveTime._hex)}
        </Typography>

        <Typography variant="body2">

        </Typography>
      </CardContent>
      <CardActions>
        <>
        {props.button(parseInt(league.leagueId._hex))}
        </>
      </CardActions>
    </Card>
  );
}

const LeagueCards = (props: any) => {
  const [time, setTime] = useState(Date.now());
  let [leagues, setLeagues] = useState(0);

  // update the thing each second
  useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  async function getThing() {
    let myFunc = props.myFunc;
    let newValue = await myFunc();
    return newValue;
  }

  getThing().then(leagues => setLeagues(leagues));
  if (leagues != 0) {
    return leagues.map(league => {
      return <LeagueCard league={league} 
      key={league.id}
      button = {props.button}
      ></LeagueCard>
    })
  } else {
    return <p>-------------------------------</p>
  }

}

export default LeagueCards;


