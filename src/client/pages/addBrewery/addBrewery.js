import React from 'react';
import './style.css';
import Header from './../../components/Header/Header';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

class addBrewery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
    }
    this.name = React.createRef();
    this.address = React.createRef();
    this.city = React.createRef();
    this.zipcode = React.createRef();
  }

  handleSubmit() {
    axios({
      method: 'post',
      url: '/api/addbrewery',
      data: {
        name: this.name.current.value,
        address: this.address.current.value,
        city: this.city.current.value,
        zipcode: this.zipcode.current.value,
      }
    })
    .then(function (response) {
      console.log('is added to the db ');
    })
    .catch(function (error) {
      console.log(error);
    }
    );
    this.setState({ redirect: true }, () => console.log(this.state));
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={'/'}/>;
    }

    return (
      <div>
        <Header/>
        <h1 className={'titel'}>Voeg hier een bier brouwerij toe </h1>
        <div className={'form'}>
          <p>Naam</p>
          <input type="text" ref={this.name}/>
          <p>Adres</p>
          <input type="text" ref={this.address}/>
          <p>Stad</p>
          <input type="text" ref={this.city}/>
          <p>Postcode</p>
          <input type="text" ref={this.zipcode}/>
          <div className={'myButtonForm'} onClick={() => this.handleSubmit()}>
            Sla nu op
          </div>
        </div>
      </div>
    );
  }
}

export default addBrewery;
