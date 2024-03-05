// materialUI
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

interface EgPhotoCardType {
    name: string;
    image: string;
    imageY: number;
}

const EgPhotoCard = ({ name, image, imageY }: EgPhotoCardType) => {
    return (
        <Card sx={{ maxWidth: 345, mx: 1 }}>
            <CardMedia
                sx={{ height: imageY }}
                image={image}
                title="green iguana"
            />
            <CardContent>
                <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                >
                    {name}
                </Typography>
                <Typography
                    variant="body2"
                    color="text.secondary"
                >
                    Lizards are a widespread group of squamate reptiles, with over 6,000
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">정보보기</Button>
                <Button size="small">수업보기</Button>
            </CardActions>
        </Card>
    );
};

export default EgPhotoCard;
