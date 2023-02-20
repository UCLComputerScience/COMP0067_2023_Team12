import * as React from 'react';
import PropTypes from 'prop-types';
// import Toolbar from '@mui/material/Toolbar';
// import Button from '@mui/material/Button';
// import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
// import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { Select, MenuItem, FormHelperText, FormControl, InputLabel, Box, Toolbar, Button,
  IconButton, Typography, Autocomplete, TextField, Paper, InputBase, Divider, Stack,
  Grid, AppBar} from '@mui/material'

function Header(props) {
  const { sections, title } = props;

  return (
    <React.Fragment>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <Toolbar>
          <Typography variant="h6" noWrap component="div">
              IBM / UCL Project Showcase
          </Typography>
          {/* Avatar alligned project right side of Toolbar */}
          <Box sx={{ flexGrow: 1 }} />
          {sections.map((section) => (
            <Button
              variant='text'
              size='large'
              // color='success'
              color="inherit"
              // noWrap
              // key={section.title}
              // href={section.url}
              // sx={{ p: 1, flexShrink: 0 }}
            >
              {section.title}
            </Button>
          ))}
          {/* <Avatar {...stringAvatar('Kent Dodds')} /> */}
          </Toolbar>
      </AppBar>

    </React.Fragment>
  );
}

Header.propTypes = {
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }),
  ).isRequired,
  title: PropTypes.string.isRequired,
};

export default Header;