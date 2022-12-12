import { User } from "../model/users";
import male from '../utils/profile-male.png';
import female from '../utils/profile-female.png';
import { UserUpdateListener } from "../shared/common-types";
import React from "react";
import { Avatar, Button, CardActions, CardContent, CardHeader, CardMedia, Chip, Collapse, IconButton, Typography } from "@mui/material";
import { IconButtonProps } from '@mui/material/IconButton';
import Card from '@mui/material/Card';
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
    onDeleteUser: UserUpdateListener;


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
        setExpanded(!expanded);
    };
    function handeleDelete(event: React.MouseEvent) {
        onDeleteUser(user);
    }



    return (
        <>

            <Card sx={{ maxWidth: 300, bgcolor: '#d7d7ddfa', margin: '20px', padding: '25px' }}>
                <CardHeader sx={{ height: CARD_HEADER_HEIGHT }}
                    avatar={
                        <Avatar alt="author" src={user.imageUrl ? user.imageUrl : user.gender === 1 ? male : female} />
                    }
                    title={'Username : ' + user.username}

                    subheader={'Time created : ' + user.timeCreated}

                />
                {user.status === 1 ? <Chip label="ACTIVE" color="success" /> : user.status === 2 ? <Chip label="SUSPENDED" color="error" /> : <Chip label="DEACTIVATED" color="error" />}


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

                {(admin === true) ? <Button id={user.id + ''} sx={{ ':hover': { backgroundColor: "rgb(0 255 0)", color: 'rgb(4 4 4)' }, backgroundColor: "rgb(4 4 4)", color: 'rgb(234 233 233)', }} onClick={() => onEditedUser(user)} variant="outlined">You are ADMIN, edit User</Button> : (user.id === owner) ? <Button id={user.id + ''} style={{ backgroundColor: "rgb(4 4 4)", color: 'rgb(234 233 233)' }} onClick={() => onEditedUser(user)} variant="outlined">Edit your profile</Button> : ''}

                {(admin === true) && (user.id === owner) ? <Typography variant="h5" sx={{ backgroundColor: "rgb(4 4 4)", color: 'rgb(234 233 233)', margin: '5px', borderRadius: '5px' }} component="div">This is your profile {user.username} ! </Typography> : admin === true ? <Button variant="outlined" sx={{ ':hover': { backgroundColor: "rgb(222 24 24)", color: 'rgb(234 233 233)' }, backgroundColor: "rgb(4 4 4)", color: 'rgb(234 233 233)' }} onClick={handeleDelete} startIcon={<DeleteIcon />}>
                    DELETE USER
                </Button> : ''}
            </Card>

        </>
    )
}

export default CardUser





