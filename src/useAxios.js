import { useState, useEffect } from 'react'
import axios from 'axios';

export default function useAxios({ url, useEffectTrigger }) {

    const [response, setResponse] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    function fetchData() {
        setLoading(true);
        console.log(useEffectTrigger);
        axios
            .get(url)
            .then(res => {
                setResponse(res.data)
                console.log("res.data : ");
                console.log(res.data);

            })
            .catch((err) => {
                setError(err.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    useEffect(() => {
            fetchData();
    }, useEffectTrigger);

    return { response, error, loading };


}
