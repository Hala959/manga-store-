import React from 'react';
import logo from './logo.svg';
import './App.css';
import FilmListing  from './compontent/FilmListing';
import FilmDetails from './compontent/FilmDetails';
import TMDB from './TMDB';


function App (){
    return (
    
        <div className="film-library">
          <FilmListing films={TMDB.films}/>
          <FilmDetails films={TMDB.films}/>
        </div>
     
    );
  }


export default App;
