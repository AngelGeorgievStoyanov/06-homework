import { User } from "../model/users"

import male from '../utils/profile-male.png'
import female from '../utils/profile-female.png'
import './CardUser.css'
import { UserUpdateListener } from "../shared/common-types";
import React from "react";
import { Avatar, Button, CardActions, CardContent, CardHeader, CardMedia, Chip, Collapse, IconButton, Typography } from "@mui/material";
import { IconButtonProps } from '@mui/material/IconButton';

import Card from '@mui/material/Card';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { styled } from '@mui/material/styles';
import { CARD_CONTENT_HEIGHT, CARD_HEADER_HEIGHT } from "../AllUsers/AllUsers";
import { getSummary } from "../utils/string-utils";
import ManIcon from '@mui/icons-material/Man';
import WomanIcon from '@mui/icons-material/Woman';
import DeleteIcon from '@mui/icons-material/Delete';

const MAX_SUMMARY_LENGTH = 180;


interface CardUserProps {
    user: User;
    owner: User | number | undefined;
    onEditedUser: UserUpdateListener;
    admin: 2 | undefined | boolean;
    onDeleteUser: UserUpdateListener


}

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}


const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export const CardUser: React.FC<CardUserProps> = ({ user, owner, onEditedUser, admin, onDeleteUser }: CardUserProps) => {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        console.log(expanded)
        setExpanded(!expanded);
    };
    function handeleDelete(event: React.MouseEvent) {
        onDeleteUser(user)
    }




    return (
        <>
            {/* <article id={user.id + ''} className="article-card">

            <h1>Username: {user.username}</h1>
            <h3>First Name : {user.firstName}</h3>
            <h3>Last Name : {user.lastName}</h3>
            {user.description ? <p>Descriprion : {user.description}</p> : ''}
            <p>Time created : {user.timeCreated}</p>
            {user.timeEdited ? <p>Last Edited : {user.timeEdited}</p> : ''}
            <h3>GENDER :{user.gender === 1 ? 'MALE' : 'FEMALE'}</h3>
            <h4>Your status : {user.status === 1 ? 'ACTIVE' : user.status === 2 ? 'SUSPENDED' : 'DEACTIVATED'} </h4>
            {user.description ? <p>Description : {user.description}</p> : ''}
            {user.imageUrl ? <img src={user.imageUrl} alt="ProfilPic" height={250} width={250} /> : user.gender === 1 ? <img src={male} alt="Profile-Male" height={250} width={250} /> : <img src={female} alt="Profile-Female" height={250} width={250} />}
            {(admin === true) ? <button id={user.id + ''} onClick={() => onEditedUser(user)}>You are ADMIN, edit User</button> : (user.id === owner) ? <button id={user.id + ''} onClick={() => onEditedUser(user)}>Edit your profile</button> : ''}
            {(admin === true) && (user.id === owner) ? <h3>This is your profile {user.username} ! </h3> : admin === true ? <button className="btn-del" onClick={handeleDelete} >DELETE USER</button> : ''}

        </article> */}
            <Card sx={{ maxWidth: 345 }}>
                <CardHeader sx={{ height: CARD_HEADER_HEIGHT }}
                    avatar={
                        <Avatar alt="author" src={user.imageUrl ? user.imageUrl : user.gender === 1 ? male : female} />
                    }
                    title={'Username : ' + user.username}
                    
                    subheader={'Time created : ' + user.timeCreated}
                    
                    />
                    { user.status===1? <Chip  label="ACTIVE" color="success" />:user.status===2?<Chip  label="SUSPENDED" color="error" />:<Chip  label="DEACTIVATED" color="error" /> }
                

                <Typography variant="h5" component="div">
                    {user.gender === 1 ? <ManIcon /> : <WomanIcon />}
                    {'First Name : ' + user.firstName}
                </Typography>
                <Typography variant="h5" component="div">
                    {'Last Name : ' + user.lastName}
                </Typography>

                <CardMedia
                    component="img"
                    height="150"
                    image={user.imageUrl ? user.imageUrl : user.gender === 1 ? male : female}

                    alt="Profile User"
                />
                <CardContent sx={{ height: CARD_CONTENT_HEIGHT }}>

                    <Typography variant="body2" color="text.secondary">

                        {user.description ? 'Description : ' + getSummary(user.description, MAX_SUMMARY_LENGTH) : ''}

                    </Typography>
                </CardContent>
                <CardActions disableSpacing>

                    <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </ExpandMore>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        {user.timeEdited ? <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            {'Last Edited :' + user.timeEdited}
                        </Typography> : ''}
                        <Typography paragraph>{user.description ? 'Description : ' + user.description : ''}</Typography>
                    </CardContent>
                </Collapse>
                {/* <Button variant="outlined" onClick={handeleDelete} startIcon={<DeleteIcon />}>
                DELETE USER
                </Button>
                <Button variant="outlined">Edit your profile</Button>
                <Button variant="outlined">You are ADMIN, edit User</Button> */}

                {(admin === true) ? <Button id={user.id + ''} onClick={() => onEditedUser(user)} variant="outlined">You are ADMIN, edit User</Button> : (user.id === owner) ? <Button id={user.id + ''} onClick={() => onEditedUser(user)} variant="outlined">Edit your profile</Button> : ''}

                {(admin === true) && (user.id === owner) ? <Typography variant="h5" component="div">This is your profile {user.username} ! </Typography> : admin === true ? <Button variant="outlined" onClick={handeleDelete} startIcon={<DeleteIcon />}>
                    DELETE USER
                </Button> : ''}

                {/* {(admin === true) ? <button id={user.id + ''} onClick={() => onEditedUser(user)}>You are ADMIN, edit User</button> : (user.id === owner) ? <button id={user.id + ''} onClick={() => onEditedUser(user)}>Edit your profile</button> : ''}
            {(admin === true) && (user.id === owner) ? <h3>This is your profile {user.username} ! </h3> : admin === true ? <button className="btn-del" onClick={handeleDelete} >DELETE USER</button> : ''} */}

            </Card>

        </>
    )
}

export default CardUser





