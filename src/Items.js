import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import {Container, Grid, Card, CardMedia, CardContent, Typography, CardActions, Button, IconButton, dividerClasses} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

// export default function Items() {
//   return(
//     <div>
//       <TutorialsList/>
//       <AddTutorial/>
//     </div>
//   )
// }


// export default function Items() {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     axios.get('/api/data')
//       .then(res => {
//         console.log('Response data:', res.data);
//         setData(res.data);
//       })
//       .catch(err => {
//         console.log('Error:', err);
//       });
//   }, []);

//   return (
//     <div>
//       <Button>madtingsasdf</Button>
//       {data.map(item => (
//         <div key={item._id}>
//           <Button>madtingsasdf</Button>
//           {/* <h3>{item.callLetters}</h3> */}
//           {/* <p>{item.type}</p> */}
//         </div>
//       ))}
//     </div>
//   );
// }

// const Record = (props) => (
//     <tr>
//       <td>{props.data.elevation}</td>
//       <td>{props.record.position}</td>
//       <td>{props.record.level}</td>
//       <td>
//         <Link className="btn btn-link" to={`/edit/${props.record._id}`}>Edit</Link> |
//         <button className="btn btn-link"
//           onClick={() => {
//             props.deleteRecord(props.record._id);
//           }}
//         >
//           Delete
//         </button>
//       </td>
//     </tr>
//    );


//    export default function Items() {
//     const [records, setRecords] = useState([]);
    
//     // This method fetches the records from the database.
//     useEffect(() => {
//       async function getRecords() {
//         const response = await fetch(`http://localhost:5000/record/`);
    
//         if (!response.ok) {
//           const message = `An error occurred: ${response.statusText}`;
//           window.alert(message);
//           return;
//         }
    
//         const records = await response.json();
//         setRecords(records);
//       }
    
//       getRecords();
    
//       return;
//     }, [records.length]);
    
//     // This method will delete a record
//     async function deleteRecord(id) {
//       await fetch(`http://localhost:5000/${id}`, {
//         method: "DELETE"
//       });
    
//       const newRecords = records.filter((el) => el._id !== id);
//       setRecords(newRecords);
//     }
    
//     // This method will map out the records on the table
//     function recordList() {
//       return records.map((record) => {
//         return (
//           <Record
//             record={record}
//             deleteRecord={() => deleteRecord(record._id)}
//             key={record._id}
//           />
//         );
//       });
//     }
    
//     // This following section will display the table with the records of individuals.
//     return (
//       <div>
//         <h3>Record List</h3>
//         <table className="table table-striped" style={{ marginTop: 20 }}>
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Position</th>
//               <th>Level</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>{recordList()}</tbody>
//         </table>
//       </div>
//     );
//    }


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
                            <Typography gutterBottom variant="body1" component="h2" fontWeight='bold' style={{color: 'blue'}}>
                            UCL MotionInput 3
                            </Typography>
                            <Typography variant="body2" style={{color: 'grey'}}>
                            IBM IXN and UCL Computer Science investigate Immersive Social Engagement proof of concepts during Covid-19 using open-source technologies. 
                            <IconButton
                                // key={element.Id}
                                variant="contained"
                                // color="default"         
                                // startIcon={< />}
                                // onClick={() => this.onInputChange(element.Id)}
                                fontSize='inherit'
                            >
                                <ArrowForwardIcon fontSize='small'/>
                                {/* {element.Value} */} 
                            </IconButton>
                            </Typography>
                        </CardContent>
                        </Card>
                    </Grid>
                    ))}
                </Grid>
                </Container>
        );
    }
                
// export default Items;