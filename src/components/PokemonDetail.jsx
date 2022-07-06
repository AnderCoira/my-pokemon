import React, { Fragment, useState, useEffect, Suspense, lazy } from 'react';
import { useParams } from "react-router-dom";
import '../styles/pokemonDetail.css';
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei';
import Bulbasaur from '../assets/3Dmodels/bulbasaur/bulbasaur.js'

export function PokemonDetail() {

    const { id } = useParams();
    const [pokemonDetail, setPokemonDetail] = useState({
        "abilities": [],
        "base_experience": 0,
        "forms": [],
        "game_indices": [],
        "height": 0,
        "held_items": [],
        "id": 0,
        "is_default": false,
        "location_area_encounter": "",
        "moves": [],
        "name": "",
        "order": 0,
        "past_types": [],
        "species": {},
        "sprites": {},
        "stats": [],
        "types": [],
        "weight": 0,
    });

    useEffect(() => {
        getPokemon(id);
    }, []);

    //API call to get all the pokemons
    const getPokemon = (pokemonID) => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonID}/`, {
            "method": "GET"
        }).then(response => response.json()).then(response => {
            console.log('Pokemon -> ', response);
            setPokemonDetail(response);
        }).catch(err => {
            console.log(err);
        });
    }

    //Method to get the image. If there is an error return the default one
    const tryToGetImage = (img, type) => {
        let imgPath;

        if(type === 'png'){
            try {
                imgPath = require(`../assets/types/${img}.png`);
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
    const setPokemonTypes = pokemonDetail.types.map((type) => {
        return (
            <div className='type' key={type.type.name}>
                <img className='pkmImage' src={tryToGetImage(type.type.name, 'svg')} />
            </div>
        );
    });

    // const MyComponent = lazy(() => import(`../assets/3Dmodels/${pokemonDetail.name}/${pokemonDetail.name}.js`));

    return (
        <Fragment>
            <div className='container'>
                <div className="parent">
                    <div className="div3Dmodel"> 
                        <Canvas className="canvas">
                            <OrbitControls enableZoom={false} /> 
                            <Bulbasaur />
                        </Canvas>
                    </div>
                    <div className="pokemonTypes"> 
                        {setPokemonTypes}
                    </div>
                    <div className="div3"> 
                        <p>Movements?¿</p>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}