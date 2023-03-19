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


  const [selectedSort, setSelectedSort] = React.useState(1);
  const [selectedFilter, setSelectedFilter] = React.useState(1);

  const [noResults, setNoResults] = useState(false);


  const selectionChangeHandlerSort = (event) => {
    setSelectedSort(event.target.value);
  };

  const selectionChangeHandlerFilter = (event) => {
    setSelectedFilter(event.target.value);
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
        // console.log(response.data)
        if (selectedSort === 1) {
          response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
         }
        if (selectedSort === 2) {
          response.data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
         }
         if (selectedSort === 3) {
          response.data.sort((a, b) => b.popularity - a.popularity);
         }
        if (selectedFilter === 2) {
          response.data = response.data.filter((item) => item.category === 'AI/ML');
         }

        // console.log(response.data)
        // console.log(sortedData)
        setItems(response.data);
        setIsLoading(false);
        
        if (response.data.length === 0) {
          setNoResults(true);
        } else {
          setNoResults(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, [currentPage, searchTerm, selectedSort, selectedFilter]);

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
                <FormControl variant='outlined' sx={{bgcolor:'white',display:"flex",width:142,borderRadius:"30px",position:"relative",left:"30px",mt:-5,border:'1px solid #6E6D7A'}}>
                    
                    <InputLabel></InputLabel>
                    <Select value={selectedSort} onChange={selectionChangeHandlerSort} input={<InputBase sx={{borderRadius: '30px',height:40,fontSize:15,textAlign:"center"}}/>}>
                        <MenuItem value={1}>Newest</MenuItem>
                        <MenuItem value={2}>Oldest</MenuItem>
                        <MenuItem value={3}>Most Popular</MenuItem>
                        {/* <MenuItem value={1}>Popular</MenuItem> */}
                    </Select>
                </FormControl>
                </Grid>


                <Grid item xs = {4}>
                <FormControl variant='outlined' sx={{bgcolor:'white',display:"flex",width:142,borderRadius:"30px",position:"relative",right:"30px",mt:-5,border:'1px solid #6E6D7A'}}>
                    
                    <InputLabel></InputLabel>
                    <Select value={selectedFilter} onChange={selectionChangeHandlerFilter} input={<InputBase sx={{borderRadius: '30px',height:40,fontSize:15,textAlign:"center"}}/>} >
                        <MenuItem value={1}>No Category</MenuItem>
                        <MenuItem value={2}>AI/ML</MenuItem>
                        <MenuItem value={3}>Back-End</MenuItem>
                        <MenuItem value={4}>Cloud</MenuItem>
                        <MenuItem value={5}>Cyber-Security</MenuItem>
                        <MenuItem value={6}>Data Science</MenuItem>
                        <MenuItem value={7}>FinTech</MenuItem>
                        <MenuItem value={8}>Front-End</MenuItem>
                        <MenuItem value={9}>Healthcare</MenuItem>
                        <MenuItem value={10}>Quantum</MenuItem>
                        <MenuItem value={11}>Sustainability</MenuItem>
                    </Select>
                </FormControl>
                </Grid>

                
        </Grid>
        <Grid sx={{ py: 3 }} />
      <Grid container spacing={4} >
        {noResults && (
          <Grid item xs={18} sx={{ textAlign: "center", pb: 4 }}>
              <Typography fontWeight="bold" variant="h3">There are no results.</Typography>
          </Grid>
        )}
        {items.map((item) => (
          <Grid item key={item.id} xs={12} sm={6} md={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: '4%' }}>
              <CardMedia
                component="img"
                sx={{
                  // 16:9
                  borderRadius: '8%',
                  height: '200px',
                  objectFit: 'cover',
                }}
                image={`http://localhost:8080/api/images/${item._id}/${item.images[0]}`}
                alt="image"
                // alt={item.title}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="body1" component="h2" fontWeight="bold" sx={{ color: 'blue' }}>
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