import React, { useEffect, useState, useRef } from "react";
import {
  useDemoData,
  getRealGridData,
  getCommodityColumns
} from "@mui/x-data-grid-generator";
import {
  Card,
  CardContent,
  Grid,
  Typography,
  LinearProgress,
  Button,
  AppBar,
  Toolbar,
  Box,
  InputBase,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import DirectionsIcon from '@mui/icons-material/Directions';
// import { makeStyles } from "@material-ui/core/styles";
import InfiniteScroll from "react-infinite-scroller";

const MAX_ROW_LENGTH = 600;

async function sleep(duration) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
}

const sections = {};

const useStyles = {};
// const useStyles = makeStyles({
//   root: { display: "flex", backgroundColor: "#e5e5e5" },
//   title: {
//     fontSize: 14
//   },
//   pos: {
//     marginBottom: 12
//   },
//   card: {
//     height: 300,
//     margin: 9
//   },
//   cardContent: {
//     margin: 9
//   }
// });

export default function InfiniteLoadingGrid() {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(6);
  const [loadedRows, setLoadedRows] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(true);
  const mounted = useRef(true);
  const { data } = useDemoData({
    dataSet: "Commodity",
    rowLength: pageSize,
    maxColumns: 6
  });

  const loadServerRows = async () => {
    setLoading(true);
    try {
      const newData = await getRealGridData(pageSize, getCommodityColumns());

      // Simulate network throttle
      await sleep(pageSize * 500 + 100);

      if (mounted.current) {
        setLoading(false);
        setLoadedRows([...loadedRows, ...newData.rows]);
      }
    } catch (err) {
      console.error("Failed to load data: ", err);
    }
  };

  const handleOnRowsScrollEnd = (params) => {
    if (loadedRows.length <= MAX_ROW_LENGTH) {
      setHasNextPage(true);
      loadServerRows(pageSize);
    } else {
      setHasNextPage(false);
    }
  };

  useEffect(() => {
    mounted.current = true;
    setLoadedRows([...data.rows]);
    return () => {
      mounted.current = false;
    };
  }, [setLoadedRows, data.rows]);


  return (
    <>    
      <InfiniteScroll
        pageStart={0}
        loadMore={handleOnRowsScrollEnd}
        hasMore={hasNextPage}
        loader={<LinearProgress key={0} />}
        className={classes.root}
      >
        <Grid
          key={`scroll-grid-${Math.random() * Math.random()}`}
          container
          justifyContent="center"
          direction="row"
          spacing={1}
        >
          {loadedRows.map((row, i) => (
            <Grid
              key={`${Math.random() * i}-${row.id}`}
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
            >
              <Card className={classes.card}>
                <CardContent className={classes.cardContent}>
                  <Typography
                    className={classes.title}
                    color="textSecondary"
                    gutterBottom
                  >
                    {row.id}
                  </Typography>
                  <Typography variant="h5" component="h2">
                    {row.commodity}
                  </Typography>
                  <Typography className={classes.pos} color="textSecondary">
                    {row.desk}
                  </Typography>
                  <Typography variant="body2" component="p">
                    {row.traderName}
                    <br />
                    {row.traderEmail}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
          {(loading || hasNextPage) && (
            <Grid item xs={12}>
              <LinearProgress />
            </Grid>
          )}
        </Grid>
      </InfiniteScroll>
    </>
  );
}