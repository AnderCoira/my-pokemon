import React, { Fragment, useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PokemonList } from './components/PokemonList';
import { PokemonDetail } from './components/PokemonDetail';
import 'bootstrap/dist/css/bootstrap.min.css';
import '/Proyectos/Webs/my-pokemon/src/styles/main.css';

export function App(){
    return(
        <Fragment>
            <BrowserRouter>
                <Routes>
                    <Route path="/" exact element={<PokemonList />} />
                    <Route path="/detail/:id" element={<PokemonDetail />} />
                </Routes>
            </BrowserRouter>
        </Fragment>
    );
}