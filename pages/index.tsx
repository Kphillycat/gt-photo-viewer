import React from "react";
import fetch from "node-fetch";
import useSWR from "swr";

import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import { makeStyles } from "@material-ui/core/styles";

const fetcher = (url) => fetch(url).then((r) => r.json());
const useStyles = makeStyles({
  media: {
    height: 200,
    width: 200,
  },
});

export default function Index() {
  const { data, error } = useSWR("/api/photos", fetcher);

  console.log("data", data);
  const classes = useStyles();

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
    </Container>
  );
}
