import React, { Fragment, useState, useEffect, Suspense } from 'react';
import { useParams } from "react-router-dom";
import '../styles/pokemonDetail.css';
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei';
import Bulbasaur from '../assets/3Dmodels/bulbasaur/Bulbasaur.js'

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
               <Canvas className="canvas">
               <OrbitControls enableZoom={false} /> 
                    <Bulbasaur />
               </Canvas>
            </div>
        </Fragment>
    );
}