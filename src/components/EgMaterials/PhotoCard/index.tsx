// hooks
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// material UI
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
    const location = useLocation().pathname;
    const [mobileView, setMobileView] = useState(false);
    useEffect(() => {
        function handleMobileView() {
            setMobileView(window.innerWidth < 500);
        }
        window.addEventListener('resize', handleMobileView);
        handleMobileView();
        return () => window.removeEventListener('resize', handleMobileView);
    }, [location]);
    return (
        <Card sx={{ width: '100%', mx: 1 }}>
            <CardMedia
                sx={{ height: mobileView ? '7rem' : imageY }}
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
                <CardActions sx={{ display: mobileView ? 'block' : 'flex', justifyContent: 'end' }}>
                    <Button
                        size="small"
                        sx={{
                            color: egPurple.default,
                            background: egWhite.default,
                            border: `1px solid ${egPurple.light}`,
                            marginLeft: mobileView ? '0.5rem' : '0',
                            fontSize: mobileView ? '10px' : '14px',
                        }}
                    >
                        정보보기
                    </Button>
                    <Button
                        size="small"
                        sx={{
                            color: egPurple.default,
                            background: egPurple.superLight,
                            fontSize: mobileView ? '10px' : '14px',
                        }}
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
