/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { Box } from '@material-ui/core'
import { Link } from 'react-router-dom'
import blue from '@material-ui/core/colors/blue';
import '../scss/style.scss'

const Header: React.FC<{}> = () => {
    return (
        <Box bgcolor={blue[500]} width='100%' height="150px" color="text.primary">
            <Box className="container">      
                <Box className="container__logo">
                    <Link to="/">
                         <img src="morimage.png" alt="Logo" />
                    </Link>
                </Box>
            </Box>
        </Box>
    )
}

export default Header