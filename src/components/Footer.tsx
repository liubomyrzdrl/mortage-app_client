import React from "react";
import { Box } from "@material-ui/core";
import blue from '@material-ui/core/colors/blue';
import '../scss/style.scss'


const Footer = () => {
  return (
    <Box  bgcolor={blue[500]} width="100%" height="80px">
      <Box className="container">
         <Box className="footer-info">
           @all rights reserved
          </Box>
      </Box>
    </Box>
  );
};

export default Footer;
