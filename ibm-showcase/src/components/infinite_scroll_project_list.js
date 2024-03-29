import React, { useState, useEffect, useRef } from 'react';
import {Select, MenuItem, FormControl, InputLabel, Container, Grid, Card, CardMedia,
        CardContent, Typography, IconButton, Button, InputBase} from '@mui/material';
import axios from "axios";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {Link} from 'react-router-dom';
import Chip from '@mui/material/Chip';

export default function ListAllProjects({ searchTerm, searchTermBack }) {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);


  const [selectedSort, setSelectedSort] = React.useState(1);
  const [selectedFilter, setSelectedFilter] = React.useState(1);

  const [noResults, setNoResults] = useState(false);

  const categories = ["AI", "Asset Management", "Automation", "Blockchain", "Capstone", "Cloud", "Data Science", "Design Thinking", "Healthcare", "IT", "Security", "Supply Chain"]

  const tagList = ["AI/ML", "Asset Management", "Automation", "Back-End", "Blockchain", "Capstone", "Cloud", "Data Science", "Design Thinking", "FinTech", "Front-End", "Healthcare", "IT", "Security", "Supply Chain", "Sustainability"]

  const handleChipClick = (tag) => {
    searchTermBack(tag)
  };


  const selectionChangeHandlerSort = (event) => {
    setSelectedSort(event.target.value);
  };

  const selectionChangeHandlerFilter = (event) => {
    setSelectedFilter(event.target.value);
  };

  const observer = useRef(null);

  function normalizeDescription(description) {
    const maxLength = 200; 
    if (description.length <= maxLength) {
      return description;
    } else {
      const truncated = description.slice(0, maxLength); 
      const lastSpaceIndex = truncated.lastIndexOf(' '); 
      const normalized = truncated.slice(0, lastSpaceIndex) + '...'; 
      return normalized;
    }
  }

  useEffect(() => {
    setIsLoading(true);

    const url = process.env.REACT_APP_API_URL + ( !searchTerm || tagList.includes(searchTerm) ? 'projects' : `projects?title=${searchTerm}` );

    axios.get(url)
      .then((response) => {
        if (selectedSort === 1) {
          response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
         }
        if (selectedSort === 2) {
          response.data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
         }
         if (selectedSort === 3) {
          response.data.sort((a, b) => b.popularity - a.popularity);
         }
        var filter_val = Math.max(selectedFilter - 1, 0)
        if (filter_val > 0) {
          response.data = response.data.filter((item) => item.category === categories[filter_val-1]);
        }

        if (tagList.includes(searchTerm)) {
          response.data = response.data.filter((item) =>
            item.tags.includes(searchTerm)
          );
        }

         const normalisedData = response.data.map((item) => {
          return {
            ...item,
            description: normalizeDescription(item.description)
          }
        });
        
        setItems(normalisedData);
        setIsLoading(false);
        
        if (response.data.length === 0) {
          setNoResults(true);
        } else {
          setNoResults(false);
        }
      })
      .catch((e) => {
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
    <Container sx={{ py: 8,bgcolor:"white" }} maxWidth="100%">
        <Grid container spacing={2} sx={{width:"100%"}}>
                <Grid item xs = {8} sx ={{display:'flex',justifyContent:'flex-start'}}>
                <FormControl sx={{bgcolor:'white',display:"flex",width:142,borderRadius:"30px",mt:-5,textAlign:'center'}}>
                    <InputLabel sx ={{textAlign:'center'}}>Filter</InputLabel>
                    <Select value={selectedSort} label="Filter" onChange={selectionChangeHandlerSort} style={{borderRadius: '30px', height:40, fontSize:15, textAlign:"center"}}>
                        <MenuItem value={1}>Newest</MenuItem>
                        <MenuItem value={2}>Oldest</MenuItem>
                        <MenuItem value={3}>Most Popular</MenuItem>
                    </Select>
                </FormControl>
                </Grid>

                <Grid item xs = {4} sx ={{display:'flex',justifyContent:'flex-end'}}>
                <FormControl variant='outlined' sx={{bgcolor:'white',display:"flex",width:142,borderRadius:"30px",mt:-5,border:'1px solid #6E6D7A',textAlign:"center"}}>
                    <InputLabel></InputLabel>
                    <Select value={selectedFilter} onChange={selectionChangeHandlerFilter} input={<InputBase sx={{borderRadius: '30px',height:40,fontSize:15,textAlign:"center"}}/>} >
                        <MenuItem value={1}>All Categories</MenuItem>
                        {categories.map((category, index) => (
                          <MenuItem key={index+2} value={index+2}>{category}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                </Grid>                
        </Grid>
        <Grid sx={{ py: 3}} />
      <Grid container spacing={4} sx={{ px: { xs: 4, sm: 10 } }} >
        {noResults && (
          <Grid item xs={18} sx={{ textAlign: "center", pb: 4 }}>
              <Typography fontWeight="bold" variant="h3">No Results.</Typography>
          </Grid>
        )}
        {items.map((item) => (
          <Grid item key={item.id} xs={12} sm={6} md={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: '4%' }}>
              <CardMedia
                component="img"
                sx={{
                  borderRadius: '8%',
                  height: '200px',
                  objectFit: 'cover',
                }}
                image={`${process.env.REACT_APP_API_URL}images/${item._id}/${item.images[0]}`}
                alt="image"
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Button component={Link} to={`/projects/${item._id}`} sx={{ textDecoration: 'none' }}>
                <Typography gutterBottom variant="body1" component="h2" fontWeight="bold" sx={{ color: 'blue', textDecoration: 'none', textTransform: 'none' }}>
                {item.title}
                </Typography>
                  </Button>
                <Typography variant="body2" style={{ color: 'grey' }}>
                  {item.description}
                  <IconButton fontSize="xx-small">
                    <Link to={`/projects/${item._id}`}>
                    <ArrowForwardIcon fontSize="xx-small" />
                    </Link>
                  </IconButton>
                </Typography>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px', justifyContent: 'center' }}>
                {item.tags
                .slice() 
                .sort((a, b) => a.localeCompare(b)) 
                .map((tag, index) => (
                  <Chip
                    key={index}
                    label={tag}
                    onClick={() => handleChipClick(tag)}
                  />
                ))}
              </div>
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