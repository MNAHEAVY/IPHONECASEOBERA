import * as React from "react";
import "./Footer.css";
import { HiMail } from "react-icons/hi";
import { BsWhatsapp } from "react-icons/bs";
import { BsInstagram } from "react-icons/bs";
import { Link } from "react-router-dom";
import { Divider } from "@mui/material";

export default function Footer() {
  return (
    <nav class="nav">
      <span id="dev">
        <Link to="/terms" color="inherit" text-decoration="none">
          Terminos |
        </Link>{" "}
        {"© "}
        <Link to="https://github.com/MNAHEAVY" color="inherit">
          MnaDev
        </Link>{" "}
        {new Date().getFullYear()}
      </span>
      <div class="links ik">
        <a id="i" href="mailto:davidalexanderh21@gmail.com">
          <HiMail />
        </a>
        <a id="i" href="https://wa.me/5493755611592">
          <BsWhatsapp />
        </a>
        <a id="i" href="https://www.instagram.com/iphonecaseobera/">
          <BsInstagram />
        </a>
      </div>
    </nav>
    // <Typography
    //   component="footer"
    //   sx={{bgcolor: 'grey' }}
    // >
    //   <Container elevation={2} sx={{ my: 4, display: 'flex' }}>
    //     <Grid container spacing={1}>
    //       <Grid item xs={6} sm={4} md={3}>
    //         <Grid
    //           container
    //           direction="column"
    //           justifyContent="flex-end"
    //           spacing={2}
    //           sx={{ height: 100 }}
    //         >
    //           <Grid item sx={{ display: 'flex' }}>
    //             <Box component="a" href="https://wa.me/5493755611592" sx={iconclass}>
    //               <img
    //                 src="../../src/assets/1.png "
    //                 alt="WhatsApp"
    //               />
    //             </Box>
    //             <Box component="a" href="https://www.instagram.com/iphonecaseobera/" sx={iconclass}>
    //               <img
    //                 src="../../src/assets/2.png"
    //                 alt="Instagram"
    //               />
    //             </Box>
    //           </Grid>
    //           <Grid item>
    //             <Copyright />
    //           </Grid>
    //         </Grid>
    //       </Grid>
    //       <Grid item xs={6} sm={4} md={2}>
    //         <Typography variant="h6" marked="left" gutterBottom>
    //           Legal
    //         </Typography>
    //         <Box component="ul" sx={{ m: 0, listclass: 'none', p: 0 }}>
    //           <Box component="li" sx={{ py: 0.5 }}>
    //             <Link href="/premium-themes/onepirate/terms/">Terms</Link>
    //           </Box>
    //           <Box component="li" sx={{ py: 0.5 }}>
    //             <Link href="/premium-themes/onepirate/privacy/">Privacy</Link>
    //           </Box>
    //         </Box>
    //       </Grid>
    //       <Grid item>
    //         {/* <Typography variant="caption">
    //           {'Page made by '}
    //           <Link href="https://www.freepik.com" rel="sponsored" title="Freepik">
    //             MnaDev
    //           </Link>
    //           {' from '}
    //           <Link href="https://www.flaticon.com" rel="sponsored" title="Flaticon">
    //             www.flaticon.com
    //           </Link>
    //           {' is licensed by '}
    //           <Link
    //             href="https://creativecommons.org/licenses/by/3.0/"
    //             title="Creative Commons BY 3.0"
    //             target="_blank"
    //             rel="noopener noreferrer"
    //           >
    //             CC 3.0 BY
    //           </Link> */}
    //         {/* </Typography> */}
    //       </Grid>
    //     </Grid>
    //   </Container>
    // </Typography>
  );
}
