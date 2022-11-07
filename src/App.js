import React, { useState, useEffect } from "react";
import PokemonList from "./PokemonList";
import axios from "axios";
import Pagination from "./Pagination";
import './App.css'

function App() {
    // const [pokemonList, setPokemonList] = useState([]);
    const [pokemonDatas, setPokemonDatas] = useState([]);
    const [currentPageURL, setCurrentPageURL] = useState('https://pokeapi.co/api/v2/pokemon?offset=0&limit=120');
    const [nextPageURL, setNextPageURL] = useState('');
    const [previousPageURL, setPreviousPageURL] = useState('');
    const [loading, setLoading] = useState(true);

    const [sprite, setSprite] = useState('front')
    const [shiny, setShiny] = useState(false)

    const [gens, setGens] = useState([]);
    const [currentGen, setCurrentGen] = useState();
    
    const [display, setDisplay] = useState('pages');
    const [error, setError] = useState(null);

    function toggleSprite(variable) {
        if (variable === 'front') {
            setSprite('back')
        } else if (variable === 'back') {
            setSprite('front')
        }
    }

    function toggleShiny() {
        if (!shiny) {
            setShiny(true)
        } else if (shiny) {
            setShiny(false)
        }
    }

    function toggleDisplay() {
        setPokemonDatas([]);
        if (display === 'pages') {
            setDisplayToGenerations();

        } else if (display === 'generations') {
            setDisplay('pages');
            setCurrentPageURL('https://pokeapi.co/api/v2/pokemon?offset=0&limit=120');
        }
    }

    // Reloading the data everytime the page changes (in pages display)
    useEffect(() => {
        if (display === 'pages') {
            setLoading(true);
            setPokemonDatas([]);
            let cancel
            // Last page returning less than 120 pokemons would change the limit in the API URL. Manually cutting the limit component from the URL and adding it after ensures it stays at 120
            axios.get(`${currentPageURL.split('&')[0]}&limit=120`, {
                cancelToken: new axios.CancelToken(c => cancel = c)
            })
                .then(res => {
                    setNextPageURL(res.data.next);
                    setPreviousPageURL(res.data.previous);
                    res.data.results.map(poke => (
                        axios.get(poke.url)
                            .then(result => {
                                setPokemonDatas(state => {
                                    state = [...state, result.data]
                                    return state
                                })
                            })
                            .catch((err) => {
                                setError(err.message)
                            })
                    ))
                    setError(null);
                })
                .catch((err) => {
                    setError(err.message)
                })

            return () => {
                cancel()
            }
        }
    }, [currentPageURL])


    function setDisplayToGenerations() {
        setLoading(true)
        setDisplay('generations');
        setCurrentPageURL('');
        
        // Fetch generations from db.json
        fetch('http://localhost:8000/generations')
            .then(res => {
                console.log(res);
                if (!res.ok) {
                    throw Error('Could not fetch data from resource')
                }
                return res.json();
            })
            .then(data => {
                setGens(data);
                setCurrentGen(1);
            })
            .catch((err) => {
                setError(err.message)
            })
    };

    // Reloading the data everytime the gen changes (in generations display mode)
    useEffect(() => {
        if (display === 'generations') {
            setLoading(true);
            setPokemonDatas([])
            console.log('Current Gen changed to ' + currentGen);
            console.log(gens[currentGen - 1]);
            gens[currentGen - 1].map(poke => (
                axios.get(poke.url)
                    .then(result => {
                        setPokemonDatas(state => {
                            state = [...state, result.data];
                            return state
                        })
                    })
                    .catch((err) => {
                        setError(err.message)
                    })
            ))
            setError(null);
        }
    }, [currentGen])

    useEffect(() => {
        setLoading(false)
    }, [pokemonDatas])

    function goToNextPage() {
        setCurrentPageURL(nextPageURL);

    };
    function goToPreviousPage() {
        setCurrentPageURL(previousPageURL);
    };

    if (loading) {
        return 'Loading, please wait'
    }

    if (!loading) return (
        <>
            
            <Pagination
                display={display}
                goToNextPage={goToNextPage}
                goToPreviousPage={goToPreviousPage}
                nextPageURL={nextPageURL}
                previousPageURL={previousPageURL}
                currentGen={currentGen}
                setCurrentGen={setCurrentGen}
            />
            <div id="toggle-gens">
                <button onClick={toggleDisplay}>Switch to display by {display === 'pages' ? 'generations' : 'pages'}</button>
                {display === 'generations' && <span id="current-gen">{currentGen < 9 ? 'Generation ' + currentGen : 'Extras (Not a generation)'}</span>}
            </div>
            <h1 className="pokefont">Pokemons list&nbsp;:&nbsp;</h1>
            {error && <p>{ error }</p>}
            <PokemonList pokemons={pokemonDatas} sprite={sprite} toggleSprite={toggleSprite} shiny={shiny} toggleShiny={toggleShiny} />
            <Pagination
                display={display}
                goToNextPage={goToNextPage}
                goToPreviousPage={goToPreviousPage}
                nextPageURL={nextPageURL}
                previousPageURL={previousPageURL}
                currentGen={currentGen}
                setCurrentGen={setCurrentGen}
            />

        </>
    );
}

export default App;
