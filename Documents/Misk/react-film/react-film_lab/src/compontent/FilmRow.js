
import React, { Component } from 'react'
import FilmPoster from "./FilmPoster"
import Fave from "./Fave"
export default class FilmRow extends Component {
    handleDetailsClick(film){
        console.log(this.props.film.title)
    }
    render() {
        const filmYear = new Date(this.props.film.release_date);
        return (
            <div onClick={() => this.handleDetailsClick(this.props.film.title)}  className="film-row">
               <FilmPoster film={this.props.film.poster_path}/>
                <div className="film-summary">
                    <h1>{this.props.film.title}</h1>
                    <p>{filmYear.getFullYear()}</p>
                </div>
                <Fave/>
            </div>
        )
    }
}