import React, { Fragment, useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import '../styles/pokemonDetail.css';

export function PokemonDetail() {

    const { id } = useParams();
    const [pokemonDetail, setPokemonDetail] = useState();


    //API call to get all the pokemons
    const getPokemon = (pokemonID) => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonID}/`, {
            "method": "GET"
        }).then(response => response.json()).then(response => {
            console.log('Pokemon -> ', response);
            setPokemonDetail(response.results);
        }).catch(err => {
            console.log(err);
        });
    }

    useEffect(() => {
        getPokemon(id);
    }, []);

    return (
        <Fragment>
            <div className='container'>
                CURRENTLY DEVELOPING DETAIL
            </div>
        </Fragment>
    );
}