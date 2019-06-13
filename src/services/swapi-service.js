export default class SwapiService {
    
    _apiBase = 'https://swapi.co/api'

    _extractId(item) {
        const idRegExp = /\/([0-9]*)\/$/
        return item.url.match(idRegExp)[1]
    }

    _transformApiPlanet = (planet) => {
        
        return {
            id: this._extractId(planet),
            name: planet.name,
            population: planet.population,
            rotationPeriod: planet.rotationPeriod,
            diameter: planet.diameter
        }
    }

    _transformApiStarship = (starship) => {

        return {
            id: this._extractId(starship),
            name: starship.name,
            model: starship.model,
            manufacturer: starship.manufacturer,
            costInCredits: starship.costInCredits,
            length: starship.length,
            crew: starship.crew,
            passengers: starship.passengers,
            cargoCapacity: starship.cargoCapacity
        }
    }

    _transformAPerson = (person) => {

        return {
            id: this._extractId(person),
            name: person.name,
            gender: person.gender,
            birthYear: person.birthYear,
            eyeColor: person.eyeColor
        }
    }

    async getResource(url)  {
        const res = await fetch(`${this._apiBase}${url}`)
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}` + 
            `, received ${res.status}` )
        }
    
        return res.json()
    }

    async getAllPeople() {
        const res = await this.getResource('/people/')
        return res.results.map(this._transformAPerson)
    }

    async getPerson(id) {
        const person = this.getResource(`/people/${id}/`)
        return this._transformAPerson(person)
    }

    async getAllPlanets() {
        const res = await this.getResource('/planets/')
        return res.results.map(this._transformApiPlanet)
    }

    async getPlanet(id) {
        const planet = await this.getResource(`/planets/${id}`)
        return this._transformApiPlanet(planet)
    }

    async getAllStarships() {
        const res = await this.getResource('/starships/')
        return res.results.ma(this._transformApiPlanet)
    }

    async getStarship(id) {
        const starship = this.getResource(`/starships/${id}`)
        return this._transformApiStarship(starship)
    }

}