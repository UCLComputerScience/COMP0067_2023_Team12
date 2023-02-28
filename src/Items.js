import {Container, Grid, Card, CardMedia, CardContent, Typography, CardActions, Button, IconButton} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';


const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];


export default function Items() {
    return (
        <Container sx={{ py: 8 }} maxWidth="md"> 
        {/* md sets max width but do we want to change this am unsure? */}
                {/* End hero unit */}
                <Grid container spacing={4}>
                    {cards.map((card) => (
                    <Grid item key={card} xs={12} sm={6} md={4}>
                        <Card
                        sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: '4%'}}
                        >
                        <CardMedia
                            component="img"
                            sx={{
                            // 16:9
                            borderRadius: '8%',
                            objectFit: 'cover'
                            }}
                            image="https://source.unsplash.com/random"
                            alt="random"
                        />
                        <CardContent sx={{ flexGrow: 1 }}>
                            <Typography gutterBottom variant="h5" component="h2">
                            UCL MotionInput 3
                            </Typography>
                            <Typography>
                            IBM IXN and UCL Computer Science investigate Immersive Social Engagement proof of concepts during Covid-19 using open-source technologies.
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <IconButton
                                // key={element.Id}
                                variant="contained"
                                // color="default"         
                                // startIcon={< />}
                                // onClick={() => this.onInputChange(element.Id)}
                            >
                                <ArrowForwardIcon/>
                                {/* {element.Value} */} 
                            </IconButton>
                        </CardActions>
                        </Card>
                    </Grid>
                    ))}
                </Grid>
                </Container>
        );
    }
                
// export default Items;