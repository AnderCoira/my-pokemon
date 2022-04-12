import React, { Fragment, useState, useEffect, useRef   } from 'react';
import { InputText } from 'primereact/inputtext';
import { useNavigate } from "react-router-dom";
import '../styles/pokemonList.css';

export function PokemonList() {
    
    const navigate = useNavigate();
    const [pokemons, setPokemons] = useState([]);
    const [filteredPokemons, setFilteredPokemons] = useState([]);

    //API call to get all the pokemons
    const getPokemons = () => {
        fetch("https://pokeapi.co/api/v2/pokemon?limit=2000", {
            "method": "GET"
        }).then(response => response.json()).then(response => {
            console.log('Pokemons -> ', response);
            setPokemons(response.results);
            setFilteredPokemons(response.results);
        }).catch(err => {
            console.log(err);
        });
    }

    //Method to get the image. If there is an error return the default one
    const tryToGetImage = (img, type) => {
        let imgPath;

        if(type === 'png'){
            try {
                imgPath = require(`../assets/pokemon/${img}.png`);
            } catch (error) {
                imgPath = require("../assets/pokemon/missing.png");
            }
        }else{
            try {
                imgPath = require(`../assets/types/${img}.svg`);
            } catch (error) {
                imgPath = require("../assets/pokemon/missing.png");
            }
        }

        return imgPath;
    }

    //Render all the pokemon cards
    const setPokemonCards = filteredPokemons.map((pokemon) => {
        let pokemonId = pokemon.url.split('/');
        let pokemonName = pokemon.name;

        if(pokemonName.length > 10) {
            pokemonName = pokemonName.substring(0,7) + '...';
        }
        
        return (
            <div key={pokemon.name} className='pkmContainer' onClick={() => { pkmCardClick(pokemon) }}>
                <h6 className='pkmName'>{pokemonName}</h6>
                <img className='pkmImage' src={tryToGetImage(pokemon.name, 'png')} />
                <span className='pkmId'>#{pokemonId[pokemonId.length - 2]}</span>
            </div>
        );
    });

    //Pokemon filter
    const searchPokemon = (value) => {
        setTimeout(() => {
            let _filterPokemons;
            if (!value.trim().length) {
                _filterPokemons = [...pokemons];
            }else {
                _filterPokemons = pokemons.filter((pokemon) => {
                    return pokemon.name.toLowerCase().startsWith(value.toLowerCase());
                });
            }

            setFilteredPokemons(_filterPokemons);
        }, 250);
    }

    //Card click handler
    const pkmCardClick = (clickedPokemon) => {
        console.log(clickedPokemon);
        const myUrl = clickedPokemon.url.split('/');
        navigate(`/detail/${myUrl[myUrl.length - 2]}`);
        
    }

    useEffect(() => {
        getPokemons();
    }, []);

    return (
        <Fragment>
            <div className='container'>
                <div className="field col-12 md:col-4 searchPokemon">
                    <span className="p-float-label">
                        <InputText id="inputtext" onChange={(e) => searchPokemon(e.target.value)} />
                        <label htmlFor="inputtext">Pokemon</label>
                    </span>
                </div>
                <div>
                    {setPokemonCards}
                </div> 
            </div>
        </Fragment>
    );
}