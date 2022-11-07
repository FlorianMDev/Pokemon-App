import { useState } from "react";

function Pokemon({ pokemon, sprite, openModal, id }) {

    return (
        <div className="pokemon-background" onClick={() => openModal(pokemon)}>
            <img src={sprite}></img>
            <div className="pokemon-name">#{id} : {pokemon.name}</div>
            <div className="types-div">
                {pokemon.types.map(type => (
                    <span className={"type " + type.type.name} key={pokemon.name + "-types" + type.type.name + "-class"}>
                        {type.type.name}
                    </span>
                ))}
            </div>

        </div>
    );
}

export default Pokemon;
