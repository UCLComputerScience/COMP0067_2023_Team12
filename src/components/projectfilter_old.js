function ProjectFilter() {

    const [selected, setSelected] = React.useState('');

    const selectionChangeHandler = (event) => {
      setSelected(event.target.value);
    };
    
    return (

        <Container className='projectTable' style={{width:"100%"}}>
        <Grid container spacing={0}>
        <Grid xs={11}>
        <FormControl variant='outlined' sx={{bgcolor:'white',display:"flex",width:134,borderRadius:"30px",mt:-7,justifyContent:"center"}}>
                    
        <InputLabel>Popular</InputLabel>
        <Select value={selected} onChange={selectionChangeHandler} input={<InputBase sx={{borderRadius: '30px',height:40,fontSize:15}}/>}>
            <MenuItem value={1}>Popular</MenuItem>
            <MenuItem value={2}>Date</MenuItem>
        </Select>
    </FormControl>
        </Grid>

        <Grid xs={1}>
        <FormControl variant='outlined' sx={{bgcolor:'white',display:"flex",width:134,borderRadius:"30px",mt:-7}}>
                    
        <InputLabel>Category</InputLabel>
        <Select value={selected} onChange={selectionChangeHandler} input={<InputBase sx={{borderRadius: '30px',height:40,fontSize:15,justifyContent:"center"}}/>} >
            <MenuItem value={3}>Category</MenuItem>
            <MenuItem value={4}>AI/ML</MenuItem>
            <MenuItem value={5}>Back-End</MenuItem>
            <MenuItem value={6}>Cloud</MenuItem>
            <MenuItem value={7}>Cyber-Security</MenuItem>
            <MenuItem value={8}>Data Science</MenuItem>
            <MenuItem value={9}>FinTech</MenuItem>
            <MenuItem value={10}>Front-End</MenuItem>
            <MenuItem value={11}>Healthcare</MenuItem>
            <MenuItem value={12}>Quantum</MenuItem>
            <MenuItem value={13}>Sustainability</MenuItem>
        </Select>
    </FormControl>
        </Grid>

        
        </Grid>
</Container>
   
  
    )
  }
  export default ProjectFilter;
  