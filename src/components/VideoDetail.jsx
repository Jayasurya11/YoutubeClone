import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { Typography, Box, Stack } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { Loader, VideosModified } from "./";
import { fetchFromAPI } from "../utils/fetchFromApi";

const VideoDetail = () => {
  const [videoDetail, setVideoDetail] = useState(null);
  const [videos, setVideos] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetchFromAPI(`videos?part=contentDetails,snippet,statistics&id=${id}`).then(
      (data) => setVideoDetail(data.items[0])
    );

    fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`).then(
      (data) => setVideos(data.items)
    );
  }, [id]);

  if (!videoDetail?.snippet) return <Loader />;

  const {
    snippet: { title, channelId, channelTitle, publishedAt },
    statistics: { viewCount, likeCount },
  } = videoDetail;
  function abbrNum(number, decPlaces) {
    decPlaces = Math.pow(10, decPlaces);

    var abbrev = ["k", "m", "b", "t"];

    for (var i = abbrev.length - 1; i >= 0; i--) {
      var size = Math.pow(10, (i + 1) * 3);

      if (size <= number) {
        number = Math.round((number * decPlaces) / size) / decPlaces;

        if (number === 1000 && i < abbrev.length - 1) {
          number = 1;
          i++;
        }

        number += abbrev[i];

        break;
      }
    }

    return number;
  }
  const month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  var published = publishedAt.slice(0, 10);

  function monthBase(published) {
    var publishedMonth = published.slice(5, 7);
    var publishedYear = published.slice(0, 4);
    var publishedDate = published.slice(8, 10);
    var mon = month[publishedMonth - 1];
    return `${mon} ${publishedDate}, ${publishedYear}`;
  }
  var views = abbrNum(viewCount, 1);
  var likes = abbrNum(likeCount, 1);
  var UploadedAt = monthBase(published);

  return (
    <Box minHeight="95vh">
      <Stack direction={{ xs: "column", md: "row" }}>
        <Box flex={1}>
          <Box
            sx={{
              width: "100%",
              position: { md: "sticky" },
              top: "70px",
              mt: "10px",
            }}
          >
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${id}`}
              className="react-player"
              controls
            />
            <Box>
              <Typography color="#fff" variant="h5" fontWeight="bold" p={2}>
                {title}
              </Typography>
              <Stack
                justifyContent="space-between"
                sx={{
                  flexDirection: { xs: "column", sm: "row" },
                  color: "#fff",
                  alignItems: { md: "center" },
                }}
                py={1}
                px={2}
              >
                <Link to={`/channel/${channelId}`}>
                  <Typography
                    variant={{ sm: "subtitle1", md: "h6" }}
                    color="#fff"
                  >
                    {channelTitle}
                    <CheckCircleIcon
                      sx={{ fontSize: "12px", color: "gray", ml: "5px" }}
                    />
                  </Typography>
                </Link>

                <Stack
                  direction="row"
                  gap="20px"
                  sx={{ mt: { xs: "10px", sm: "0" }, color: "gray" }}
                  alignItems="center"
                  // justifyContent="flex-end"
                >
                  <Typography variant="body1">{UploadedAt}</Typography>
                  <Typography variant="body1">{views} views</Typography>
                  <Typography variant="body1">{likes} likes</Typography>
                </Stack>
              </Stack>
            </Box>
          </Box>
        </Box>
        <Box
          px={2}
          py={{ md: 1, xs: 5 }}
          justifyContent="center"
          alignItems="center"
        >
          {/* <Videos videos={videos} direction="column" /> */}
          <VideosModified videos={videos} />
        </Box>
      </Stack>
    </Box>
  );
};

export default VideoDetail;
