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
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";

import { ALL } from "../lib/constants";

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
  const [width, setWidth] = useState(ALL);
  const { data, error } = useSWR(
    `/api/photos?limit=${limit}&start=${start}&width=${width}`,
    fetcher
  );

  const classes = useStyles();

  const handlePagination = (event, value) => {
    setPage(value);
    let startOffset = (value - 1) * 10;
    setStart(startOffset);
    setLimit(startOffset + 10);
  };

  const handleWidthSelection = ({ target: { value } }) => {
    setWidth(value);
  };

  return (
    <Container>
      <Box my={4}>
        <Typography variant="h3" component="h1" gutterBottom>
          GT Photo Gallery
        </Typography>
        <Typography component="p" gutterBottom>
          Select Width
        </Typography>
        <Select native value={width} onChange={handleWidthSelection}>
          <option aria-label="None" value={ALL}>
            ALL
          </option>
          <option value={100}>100</option>
          <option value={250}>250</option>
          <option value={300}>300</option>
          <option value={400}>400</option>
        </Select>
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
      {width === ALL && (
        <Box component="span" m={1}>
          <Pagination count={5} page={page} onChange={handlePagination} />
        </Box>
      )}
    </Container>
  );
}
