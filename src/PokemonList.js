import { useState, useEffect } from 'react';
import Pokemon from './Pokemon';
import Modal from './Modal';


const PokemonList = ({ pokemons, sprite, toggleSprite, shiny, toggleShiny }) => {

    const [selectedPokemon, setSelectedPokemon] = useState({});
    const [open, setOpen] = useState(false);



    useEffect(() => {
        if (Object.keys(selectedPokemon).length) {
            console.log('pokemon selectionné : ' + selectedPokemon.name);
            setOpen(true);

            return;
        }
        setOpen(false);

    }, [selectedPokemon]);

    function openModal(poke) {
        console.log(poke);
        setSelectedPokemon(poke)
    }

    const closeModal = () => {
        setSelectedPokemon({});
    }

    useEffect(() => {
        console.log('Open : ' + open);
    }, [open])

    return (
        <>
            <div className='toggles'>
                <button onClick={() => toggleSprite(sprite)}>Front/Back sprites</button>
                <button id="shiny" onClick={() => toggleShiny()}>Toggle Shiny</button>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between" }}>
                {pokemons.sort(function (a, b) { return a.id - b.id })
                    .map(p => (

                        <Pokemon
                            pokemon={p}
                            key={p.name + "#" + p.id}
                            sprite={shiny ?
                                sprite === 'front' ? p.sprites.front_shiny : p.sprites.back_shiny
                                : sprite === 'front' ? p.sprites.front_default : p.sprites.back_default}
                            id={p.id < 100
                                ? p.id >= 10
                                    ? "0" + p.id
                                    : "00" + p.id
                                : p.id}
                            openModal={openModal}
                        />
                    ))
                }
                {open && <Modal
                    pokemon={selectedPokemon}
                    closeModal={closeModal}
                    id={selectedPokemon.id < 100
                        ? selectedPokemon.id >= 10
                            ? "0" + selectedPokemon.id
                            : "00" + selectedPokemon.id
                        : selectedPokemon.id}
                />}
            </div>
        </>
    );
}

export default PokemonList;
