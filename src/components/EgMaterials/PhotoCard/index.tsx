// materialUI
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
//color
import colors from 'assets/colors/palette';
interface EgPhotoCardType {
    id: number;
    name: string;
    birthYear?: number;
    image: string;
    describe?: string;
    imageY: number;
    type?: string;
}

const EgPhotoCard = ({ id, name, image, birthYear, describe, imageY, type }: EgPhotoCardType) => {
    const { egWhite, egPurple } = colors;
    return (
        <Card sx={{ width: '100%', mx: 1 }}>
            <CardMedia
                sx={{ height: imageY }}
                image={image}
                title="green iguana"
            />
            <CardContent>
                <Typography
                    gutterBottom
                    variant="h6"
                    component="div"
                >
                    {name}
                </Typography>
                {birthYear && (
                    <Typography
                        variant="body2"
                        color="text.secondary"
                    >
                        {birthYear} 년생
                    </Typography>
                )}
                <Typography
                    variant="body2"
                    color="text.secondary"
                >
                    {describe}
                </Typography>
            </CardContent>
            {type && type === 'coach' ? (
                <CardActions sx={{ display: 'flex', justifyContent: 'end' }}>
                    <Button
                        size="small"
                        sx={{ color: egPurple.default }}
                    >
                        정보보기
                    </Button>
                    <Button
                        size="small"
                        sx={{ color: egPurple.default }}
                    >
                        수업보기
                    </Button>
                </CardActions>
            ) : (
                <></>
            )}
        </Card>
    );
};

export default EgPhotoCard;
