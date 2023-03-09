import React, { useState, useEffect, useRef } from 'react';
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Toolbar,
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Button,
  InputBase
} from '@mui/material';

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import axios from "axios";

export default function ListAllProjects2() {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);


        const [selected, setSelected] = React.useState('');

        const selectionChangeHandler = (event) => {
          setSelected(event.target.value);
        };

  const observer = useRef(null);

  useEffect(() => {
    setIsLoading(true);

    axios.get('http://localhost:8080/api/projects')
      .then((response) => {
        setItems((prevItems) => {
          const existingIds = new Set(prevItems.map((item) => item.id));
          const newItems = response.data.filter((item) => !existingIds.has(item.id));
          console.log('ITS WORKING HERE')
          console.log(existingIds)
          return [...prevItems, ...newItems];
        });
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, [currentPage]);

  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting) {
          setCurrentPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 1 }
    );
  }, []);

  useEffect(() => {
    if (isLoading || currentPage === 1) return;

    observer.current.observe(document.querySelector('#sentinel'));

    return () => {
      observer.current.unobserve(document.querySelector('#sentinel'));
    };
  }, [isLoading, currentPage]);

  return (
    <Container sx={{ py: 8 }} maxWidth="md">
        {items.map((item) => (
          <Grid item key={item.id} xs={12} sm={6} md={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: '4%' }}>
              <CardMedia
                component="img"
                sx={{
                  // 16:9
                  borderRadius: '8%',
                  objectFit: 'cover',
                }}
                image={item.images}
                alt={item.title}
              />
              <Button> {item.images}</Button>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="body1" component="h2" fontWeight="bold" style={{ color: 'blue' }}>
                  {item.title}
                </Typography>
                <Typography variant="body2" style={{ color: 'grey' }}>
                  {item.description}
                  <IconButton fontSize="inherit">
                    <ArrowForwardIcon fontSize="small" />
                  </IconButton>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
        {isLoading && <Typography>Loading...</Typography>}
        {!isLoading && (
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
            <div id="sentinel" style={{ height: 10 }} />
          </Grid>
        )}
    </Container>
  );
}