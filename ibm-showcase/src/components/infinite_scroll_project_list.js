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
import axios from "axios";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import sortAndFilterData from './sortingandfiltering';

export default function ListAllProjects({ searchTerm }) {
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

    if (!searchTerm) {
      var url = `http://localhost:8080/api/projects`
    } else {
      var url = `http://localhost:8080/api/projects?title=${searchTerm}`
    }

    axios.get(url)
      // .then((response) => {
      //   console.log(response)
      //   setItems((prevItems) => {
      //     const existingIds = new Set(prevItems.map((item) => item.id));
      //     const newItems = response.data.filter((item) => !existingIds.has(item.id));
      //     console.log(newItems)
      //     return [...prevItems, ...newItems];
      //   });
      //   setIsLoading(false);
      // })
      .then((response) => {
        console.log(response.data)
        if (selected == 2) {
          response.data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
         }
        if (selected == 3) {
         response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        }
        if (selected == 5) {
          response.data.filter((item) => item.property === 'AI/ML');
         }
        // const sortedData = sortAndFilterData(response.data, selected)
        // console.log(response.data)
        // console.log(sortedData)
        setItems(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, [currentPage, searchTerm, selected]);

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
        <Grid container spacing={2} sx={{width:"100%"}}>
                <Grid item xs = {8}>
                <FormControl variant='outlined' sx={{bgcolor:'white',display:"flex",width:134,borderRadius:"30px",position:"relative",left:"30px",mt:-5,border:'1px solid #6E6D7A'}}>
                    
                    <InputLabel></InputLabel>
                    <Select value={selected} onChange={selectionChangeHandler} input={<InputBase sx={{borderRadius: '30px',height:40,fontSize:15,textAlign:"center"}}/>}>
                        <MenuItem value={1}>Popular</MenuItem>
                        <MenuItem value={2}>Date Asc</MenuItem>
                        <MenuItem value={3}>Date Desc</MenuItem>
                    </Select>
                </FormControl>
                </Grid>


                <Grid item xs = {4}>
                <FormControl variant='outlined' sx={{bgcolor:'white',display:"flex",width:134,borderRadius:"30px",position:"relative",right:"30px",mt:-5,border:'1px solid #6E6D7A'}}>
                    
                    <InputLabel>Category</InputLabel>
                    <Select value={selected} onChange={selectionChangeHandler} input={<InputBase sx={{borderRadius: '30px',height:40,fontSize:15,textAlign:"center"}}/>} >
                        <MenuItem value={4}>Category</MenuItem>
                        <MenuItem value={5}>AI/ML</MenuItem>
                        <MenuItem value={6}>Back-End</MenuItem>
                        <MenuItem value={7}>Cloud</MenuItem>
                        <MenuItem value={8}>Cyber-Security</MenuItem>
                        <MenuItem value={9}>Data Science</MenuItem>
                        <MenuItem value={10}>FinTech</MenuItem>
                        <MenuItem value={12}>Front-End</MenuItem>
                        <MenuItem value={12}>Healthcare</MenuItem>
                        <MenuItem value={13}>Quantum</MenuItem>
                        <MenuItem value={14}>Sustainability</MenuItem>
                    </Select>
                </FormControl>
                </Grid>

                
        </Grid>
        <Grid sx={{ py: 3 }} />
      <Grid container spacing={4} >
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
      </Grid>
    </Container>
  );
}