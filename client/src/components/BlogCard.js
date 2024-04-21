import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import ModeEditIcon from '@mui/icons-material/ModeEdit'
import DeleteIcon from '@mui/icons-material/Delete'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Box } from '@mui/material';


export default function BlogCard({ title, description, image, username, date, id, isUser }) {

    const shareToInstagram = () => {
        const url = "https://www.instagram.com/";
        window.open(url, "_blank");
    };

    const shareToTwitter = () => {
        const url = "https://twitter.com/";
        window.open(url, "_blank");
    };

    const navigate = useNavigate();
    const handleEdit = () => {
        navigate(`/blog-details/${id}`);
    };
    const handleDelete = async () => {
        try {
            const { data } = await axios.delete(`/api/v1/blog/deleteblog/${id}`);
            if (data?.success) {
                alert("Blog Deleted");
                window.location.reload();
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (

        <Card sx={{
            width: '40%', margin: 'auto', mt: 2, padding: 2, boxShadow: '5px 5px 10px #ccc', ":hover:": {
                boxShadow: "10px 10px 20px #ccc"
            }
        }}>
            {isUser && (
                <Box display={"flex"}>
                    <IconButton onClick={handleEdit} sx={{ marginLeft: "auto" }}>
                        <ModeEditIcon color="info" />
                    </IconButton>
                    <IconButton onClick={handleDelete}>
                        <DeleteIcon color="error" />
                    </IconButton>
                </Box>
            )}
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        {username}
                    </Avatar>
                }

                title={title}
                subheader={date}
            />
            <CardMedia
                component="img"
                height="350"
                image={image}
                alt={username}
            />
            <CardContent>
                <Typography variant="h6" color="text.secondary">
                    Title: {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="Instagram" onClick={shareToInstagram}>
                    <InstagramIcon />
                </IconButton>
                <IconButton aria-label="Twitter" onClick={shareToTwitter}>
                    <TwitterIcon />
                </IconButton>
            </CardActions>

        </Card>
    );
}