const fetch = require('node-fetch');
let swaplogic = {}

swaplogic.getPeople = () => {
    return fetch('https://swapi.co/api/people').then(res => res.json())
        .then(json => {
            return Promise.all(
                json.results.map((res, i) => {
                    return getFilmsData(res.films)
                        .then(data => {
                            json.results[i]["films"] = data;
                            return gethomeworldData(res.homeworld)
                        })
                        .then(data => {
                            json.results[i]["homeworld"] = data;
                            return getSpeciesData(res.species)
                        })
                        .then(data => {
                            json.results[i]["species"] = data;
                            return json.results[i];
                        })
                })).catch(err => {
                    return err;
                })
        })
        .catch(err => {
            return err;
        })
}

swaplogic.getCharacter = (name) => {
    return fetch(`https://swapi.co/api/people/?search=${name}`).then(res => res.json())
        .then(json => {
            return Promise.all(
                json.results.map((res, i) => {
                    return getFilmsData(res.films)
                        .then(data => {
                            json.results[i]["films"] = data;
                            return gethomeworldData(res.homeworld)
                        })
                        .then(data => {
                            json.results[i]["homeworld"] = data;
                            return getSpeciesData(res.species)
                        })
                        .then(data => {
                            json.results[i]["species"] = data;
                            return json.results[i];
                        })
                })).catch(err => {
                    return err;
                })
        })
        .catch(err => {
            return err;
        })
}



function gethomeworldData(homeworld) {
    return fetch(homeworld).then(res => res.json())
        .then(json => {
            let hw = {};
            hw["Title"] = json.name;
            hw["terrain"] = json.terrain;
            hw["population"] = json.population;
            return hw;
        })
        .catch(err => {
            console.log(err)
            res.send(err)
        })
}


function getSpeciesData(species) {
    const result = [];
    return Promise.all(
        species.map((specie, i) => {
            return fetch(specie).then(res => res.json())
                .then(data => {
                    let sp = {}
                    sp["name"] = data.name;
                    sp["average_lifespan"] = data.average_lifespan;
                    sp["classification"] = data.classification;
                    sp["language"] = data.language;
                    result.push(sp);
                })
                .catch(err => {
                    console.log(err)
                    res.send(err)
                })
        })
    )
        .then(() => {
            return result;
        })
}

function getFilmsData(films) {
    const result = [];
    return Promise.all(
        films.map((filmurl, i) => {
            return fetch(filmurl).then(res => res.json())
                .then(data => {
                    let fl = {}
                    fl["title"] = data.title;
                    fl["director"] = data.director;
                    fl["producer"] = data.producer;
                    fl["release_date"] = data.release_date;
                    result.push(fl);
                })
                .catch(err => {
                    console.log(err)
                    res.send(err)
                })
        })
    )
        .then(() => {
            return result;
        })
}

module.exports = swaplogic;