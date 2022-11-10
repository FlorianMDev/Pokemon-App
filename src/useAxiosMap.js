import { useState, useEffect } from 'react'
import axios from 'axios';

export default function useAxiosMap({ mapTab, useEffectTrigger }) {


    const [response, setResponse] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    function fetchData() {
        setResponse([]);
        setLoading(true);
        console.log(useEffectTrigger);
        console.log(mapTab);
        mapTab.map(poke => (
            axios
                .get(poke.url)
                .then(result => {
                    setResponse(state => {
                        state = [...state, result.data]
                        return state
                    })
                })
                .catch((err) => {
                    setError(err.message)
                })
                .finally(() => {
                    setLoading(false);
                })
        ));
    }

    useEffect(() => {
        if (useEffectTrigger?.length > 0) {
            fetchData();
        }

    }, [useEffectTrigger]);

    return { response, error, loading };


}

