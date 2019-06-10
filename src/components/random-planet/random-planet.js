import React, { Component } from 'react';
import SwapiService from '../../services/swapi-service'
import './random-planet.css';

export default class RandomPlanet extends Component {

  swapiService = new SwapiService()
  
  state = {
    planet: {}
  }

  onPlanetLoaded = (planet) => {
    this.setState({planet})
  }

  updatePlanet() {
    const id = Math.floor(Math.random()*25 + 2)
    this.swapiService.getPlanet(id)
    .then((this.onPlanetLoaded))
  }

  constructor() {
    super()
    this.updatePlanet()
  }


  render() {

    const { planet: {id, name, population, rotationPeriod, diameter} } = this.state
    console.log(`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`)
    return (
      <div className="random-planet jumbotron rounded">
        <img className="planet-image"  
             src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`} />
        <div>
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span className="term">Population: {population}</span>
              <span></span>
            </li>
            <li className="list-group-item">
              <span className="term">Rotation Period: {rotationPeriod}</span>
              <span>43</span>
            </li>
            <li className="list-group-item">
              <span className="term">Diameter: {diameter}</span>
              <span>100</span>
            </li>
          </ul>
        </div>
      </div>

    );
  }
}
