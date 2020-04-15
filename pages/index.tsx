import React, { useState } from "react";
import fetch from "node-fetch";
import useSWR from "swr";

import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import Pagination from "@material-ui/lab/Pagination";

import { makeStyles } from "@material-ui/core/styles";

const fetcher = (url) => fetch(url).then((r) => r.json());
const useStyles = makeStyles({
  media: {
    height: 200,
    width: 200,
  },
});

export default function Index() {
  const [limit, setLimit] = useState(10);
  const [start, setStart] = useState(0);
  const [page, setPage] = useState(1);
  const { data, error } = useSWR(
    `/api/photos?limit=${limit}&start=${start}`,
    fetcher
  );

  console.log("data", data);
  const classes = useStyles();

  const handlePagination = (event, value) => {
    setPage(value);
    console.log("start", (start + 10) * limit);
    setStart(10 * value);
    setLimit(10 * value + 10);
  };

  return (
    <Container>
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          GT Photo Gallery
        </Typography>
      </Box>
      <Grid container spacing={3}>
        {data &&
          data.photos.map((photo, i) => (
            <Grid item key={i}>
              <Card>
                <CardMedia className={classes.media} image={photo} />
              </Card>
            </Grid>
          ))}
      </Grid>
      <Box component="span" m={1}>
        <Pagination count={5} page={page} onChange={handlePagination} />
      </Box>
    </Container>
  );
}
