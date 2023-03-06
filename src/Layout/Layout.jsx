import React from 'react';
import {Outlet} from 'react-router-dom';
import "./Layout.css"



export default function Layout(){

    
    return(
        <>
     
        <main className='fondo'> <Outlet /> </main>
      
        
        </>
        
        )
}
