import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Box } from '@material-ui/core'

const Layout:React.FC<{}> = ({ children }) => {
    return (
        <Box component="div" display="flex" flexDirection="column" minHeight="100vh" >
            <Header />
                <Box flex="1 1 auto" color="text.primary">{children}</Box> 
            <Footer />
        </Box>
    )
}

export default Layout