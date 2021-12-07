// import React from 'react';
import * as React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import { useHistory } from 'react-router';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { LocalHotel } from '@mui/icons-material';
import WcIcon from '@mui/icons-material/Wc';
import CurrencyYuanIcon from '@mui/icons-material/CurrencyYuan';
import Button from '@mui/material/Button';
import { blue } from '@material-ui/core/colors';

const useStyles=makeStyles((theme)=>({
        root:{
            maxWidth:345,
        },
        media:{
            height:0,
            paddingTop:'56.25%',
        },
        expand:{
            transform:'rotate(0deg)',
            marginLeft:'auto',
            transition:theme.transitions.create('transform',{
                transition:theme.transitions.duration.shortest,
            }),         
        },
        expandOpen:{
           transform:'rotate(180deg)', 
        },
        avatar:{
            backgroundColor:red,
        }
}))

const Room = ({room}) => {
    const classes=useStyles();
    const history=useHistory();
    const handleBook=(bedType)=>{
      history.push(`/Book/${bedType}`)
    }
    return (
            <Card className={classes.root}>
      <CardHeader
         avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {room.avatar}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={room.title}
      />
      <CardMedia
        className={classes.media}
        image={room.imgUrl}
        alt={room.title}
      />
      <img src={`/images/${room.bedType}.png`} alt=""/>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
         {room.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="bed">
          <LocalHotel></LocalHotel>:{room.bed}
        </IconButton>
        <IconButton aria-label="capacity">
            <WcIcon></WcIcon>:{room.capacity}
        </IconButton>
        <IconButton aria-label="price">
            <CurrencyYuanIcon></CurrencyYuanIcon>:{room.price}
        </IconButton>
        <Button onClick={()=>handleBook(room.bedType)} variant="contained" color="success">Book Now</Button>
      </CardActions>
    </Card>
    );
};

export default Room;