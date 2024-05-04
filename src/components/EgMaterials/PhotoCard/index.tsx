// hooks
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// recoil
import { useRecoilValue } from "recoil";
import { IsMobileAtom } from "atom/isMobile";
// material UI
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
//color
import colors from "assets/colors/palette";
interface EgPhotoCardType {
  _id: string;
  name: string;
  birthYear?: number | string;
  photo?: string;
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
  photo,
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
  let isMobile = useRecoilValue(IsMobileAtom);
  const navigate = useNavigate();
  return (
    <Card
      sx={{ width: "100%", mx: 1 }}
      onClick={() => cardType === "class" && navigate(`/admin/class/${_id}`)}
    >
      <CardMedia
        sx={{
          height: isMobile ? "7rem" : imageY,
          border: `1px solid ${egPurple.light}`,
        }}
        image={photo}
        title="green iguana"
      />
      <CardContent>
        <div className="text-lg font-bold">{name}</div>
        {birthYear && (
          <Typography variant="body2" color="text.secondary">
            {birthYear} 년생
          </Typography>
        )}
        <Typography variant="body2" color="text.secondary">
          {describe}
        </Typography>
        {amount && (
          <div className=" mt-2 flex w-full ">
            <div className="mr-2 px-1 font-bold bg-egPurple-superLight">
              참석
            </div>
            <div className="">
              {attendance} / {amount}
            </div>
          </div>
        )}
        {place && (
          <div className=" mt-2 flex w-full ">
            <div className="mr-2 px-1 font-bold bg-egPurple-superLight">
              위치
            </div>
            <div className="">{place} </div>
          </div>
        )}
        {startTime && endTime && (
          <div className=" mt-2 flex w-full ">
            <div className="mr-2 px-1 font-bold bg-egPurple-superLight">
              시간
            </div>
            <div className="">{startTime.slice(0, 10)}</div>
            <div className="ml-2">
              {startTime.slice(11, 16)}~{endTime.slice(11, 16)}
            </div>
          </div>
        )}
      </CardContent>
      {cardType && cardType === "coach" ? (
        <CardActions
          sx={{ display: isMobile ? "block" : "flex", justifyContent: "end" }}
        >
          <Button
            size="small"
            sx={{
              color: egPurple.default,
              background: egWhite.default,
              border: `1px solid ${egPurple.light}`,
              marginLeft: isMobile ? "0.5rem" : "0",
              fontSize: isMobile ? "10px" : "14px",
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
              fontSize: isMobile ? "10px" : "14px",
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
