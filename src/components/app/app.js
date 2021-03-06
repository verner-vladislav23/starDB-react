import React, {Component} from 'react'

import Header from '../header'
import RandomPlanet from '../random-planet'
import ItemList from '../item-list'
import PersonDetails from '../person-details'
import ErrorIndicator from '../error-indicator'
import SwapiService from '../../services/swapi-service'
import PeoplePage from '../people-page'
import './app.css'



export default class App extends Component {

  swapiService = new SwapiService()

  state = { 
    selectedPerson: null,
    hasError: false
  }

  onPersonSelected = (id) => {
    this.setState({
      selectedPerson: id
    })
  }

  componentDidCatch() {
    this.setState({hasError: true})
  }

  render() {

    if (this.state.hasError) {
      return <ErrorIndicator />
    }

    return (
      <div>
      <Header />
      <RandomPlanet />
      <PeoplePage> </PeoplePage>

      
      <div className="row mb2">
        <div className="col-md-6">
          <ItemList 
          onItemSelected={this.onPersonSelected}
          getData={this.swapiService.getAllPeople}
          renderItem={(item) => item.name}/>
        </div>
        <div className="col-md-6">
          <PersonDetails personId={this.state.selectedPerson}/>
        </div>
      </div>

    </div>
  )
  } 
};
