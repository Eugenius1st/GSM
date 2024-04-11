// hooks
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// recoil
import { useRecoilValue } from 'recoil';
import { IsMobileAtom } from 'atom/isMobile';
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
    let isMobile = useRecoilValue(IsMobileAtom);
    const navigate = useNavigate();
    return (
        <Card
            sx={{ width: '100%', mx: 1 }}
            onClick={() => type === 'class' && navigate(`/admin/class/${id}`)}
        >
            <CardMedia
                sx={{ height: isMobile ? '7rem' : imageY }}
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
                <CardActions sx={{ display: isMobile ? 'block' : 'flex', justifyContent: 'end' }}>
                    <Button
                        size="small"
                        sx={{
                            color: egPurple.default,
                            background: egWhite.default,
                            border: `1px solid ${egPurple.light}`,
                            marginLeft: isMobile ? '0.5rem' : '0',
                            fontSize: isMobile ? '10px' : '14px',
                        }}
                        onClick={() => navigate(`/admin/coach/${id}`)}
                    >
                        정보보기
                    </Button>
                    <Button
                        size="small"
                        sx={{
                            color: egPurple.default,
                            background: egPurple.superLight,
                            fontSize: isMobile ? '10px' : '14px',
                        }}
                        onClick={() => navigate(`/admin/coach/coach-class/${id}`)}
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
