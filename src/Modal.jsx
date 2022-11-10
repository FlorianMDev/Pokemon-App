import "./Modal.css";

export default function Modal({ pokemon, closeModal, id }) {



    return (
        <div className="css-modal">
            <div className="css-modal-content">

                <div className="css-modal-header">
                    <h1 className="pokemon-name">#{id} : {pokemon?.name}
                        {pokemon.types?.map(t => (
                            <span className={"type " + t?.type.name} key={pokemon?.name + "-types" + t?.type.name + "-class"}>
                                {t?.type.name}
                            </span>
                        ))}
                    </h1>
                    <span onClick={closeModal} className="close">Close&times;</span>
                </div>
                <div className="css-modal-container">

                    <div>
                        <img src={"https://assets.pokemon.com/assets/cms2/img/pokedex/full/" + id + ".png"} alt={pokemon?.name + " image"} />
                    </div>

                    <div>
                        <h2>Base Stats</h2>
                        <ul>
                            {pokemon.stats?.map(s => (
                                <li key={s.stat.name}>{`${s?.stat.name} : ${s?.base_stat}`}</li>
                            ))}
                        </ul>
                    </div>
                </div>

                <h2>Learnable Moves</h2>
                <div className="move-list">
                    {pokemon.moves?.map(m => (
                        <span key={m?.move.name} className="move">{m?.move.name}</span>
                    ))}
                </div>
                <div className="close-bottom">
                    <span onClick={closeModal} className="close">Close&times;</span>
                </div>

            </div>
        </div>
    )
}