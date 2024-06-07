// hooks
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
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
// image
import userTempPhoto from 'assets/user/userTempPhoto.png';
// utility
import { classImageByClassName } from 'utility/photoConst';
interface EgPhotoCardType {
    _id: string;
    name: string;
    birthYear?: number | string;
    describe?: string;
    imageY: number | string;
    cardType?: string;
    startTime?: string;
    endTime?: string;
    amount?: number;
    place?: string;
    type?: string;
    attendance?: number;
}

const EgPhotoCard = ({
    _id,
    name,
    birthYear,
    describe,
    imageY,
    cardType,
    startTime,
    endTime,
    amount,
    place,
    attendance,
    type,
}: EgPhotoCardType) => {
    const { egWhite, egPurple } = colors;
    const [photo, setPhoto] = useState<any>('');
    let isMobile = useRecoilValue(IsMobileAtom);
    const navigate = useNavigate();

    useEffect(() => {
        if (cardType === 'coach' && _id) {
            axios
                .get(`${process.env.REACT_APP_API_URL}/photo/admin/${_id}?isThumbnail=true`, { responseType: 'blob' })
                .then((response) => {
                    const url = window.URL.createObjectURL(
                        new Blob([response.data], { type: response.headers['content-type'] })
                    );
                    setPhoto(url);
                    console.log('photo', photo);
                })
                .catch((error) => console.log(error));
        } else if (cardType === 'class') {
            const matchedPhoto = classImageByClassName(name);
            setPhoto(matchedPhoto);
        }
    }, []);
    return (
        <Card
            sx={{ width: '100%', mx: 1 }}
            onClick={() => cardType === 'class' && navigate(`/admin/class/${_id}`)}
        >
            <CardMedia
                sx={{
                    height: isMobile ? '7rem' : imageY,
                    border: `1px solid ${egPurple.light}`,
                }}
                image={photo ? photo : userTempPhoto}
                title="green iguana"
            />
            <CardContent>
                <div className="text-lg font-bold">
                    {name}
                    {type && ` (${type})`}
                </div>
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
                {amount && (
                    <div className="flex w-full mt-2 ">
                        <div className="px-1 mr-2 font-bold bg-egPurple-superLight">참석</div>
                        <div className="">
                            {attendance} / {amount}
                        </div>
                    </div>
                )}
                {place && (
                    <div className="flex w-full mt-2 ">
                        <div className="px-1 mr-2 font-bold bg-egPurple-superLight">위치</div>
                        <div className="">{place} </div>
                    </div>
                )}
                {startTime && endTime && (
                    <div className="flex w-full mt-2 ">
                        <div className="px-1 mr-2 font-bold bg-egPurple-superLight h-fit whitespace-nowrap">시간</div>
                        <div className="">
                            {`${startTime.slice(2, 10)} (${startTime.slice(11, 16)} ~ ${endTime.slice(11, 16)})`}
                        </div>
                    </div>
                )}
            </CardContent>
            {cardType && cardType === 'coach' ? (
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
                        onClick={() => navigate(`/admin/coach/${_id}`)}
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
                        onClick={() => navigate(`/admin/coach/coach-class/${_id}`)}
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
