import axios from "axios";

export const baseUrl = 'https://bayut.p.rapidapi.com'


export const fetchApi = async (url) => {
    const { data } = await axios.get((url), {
        headers: {
            'X-RapidAPI-Key': 'd2f0d66c2dmshc841025c94cfa9bp16c747jsnd920a4c65066',
            'X-RapidAPI-Host': 'bayut.p.rapidapi.com'
          }

    })

    return data;
}

