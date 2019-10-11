import React from 'react';
import './results.css';
import axios from 'axios';

const stripchar = require('stripchar').StripChar;

class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resultList: [],
      beerListToggleState: [],
      beerListState: [],
    }
  }

  handleBeerList(brewery, index) {
    axios({
      method: 'post',
      url: '/api/bieren',
      data: {
        brouwer: brewery,
      }
    })
    .then(res => {
      let beerList = this.state.beerListState;
      beerList[index] = res.data;

      let beerListToggle = this.state.beerListToggleState;
      if (beerListToggle[index]) {
        beerListToggle[index] = !beerListToggle[index];
      } else {
        beerListToggle[index] = true;
      }

      this.setState({ beerListState: beerList, beerListToggleState: beerListToggle });
    });
  }

  renderResults(data) {
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let now = new Date();

    let radiusFilter = data.filter((item => {
      return parseFloat(item.distance) <= parseFloat(this.props.filterData);
    }));

    let output = radiusFilter.map((item, index) => {
      let beerContent = [];
      if (this.state.beerListState[index]) {
        beerContent = this.state.beerListState[index].map((i, index) => {
          return (
            <span key={index}>
            <div>{i.name}</div>
              <div className={'dropdown-details-box'}>
                <div>{`Alcohol: ${i.alcohol} %`}</div>
                <div>{`Keg: ${i.keg}`}</div>
                <div>{`Style: ${i.style}`}</div>
                <div>{`Volume: ${i.volume}`}</div>
              </div>
            </span>
          );
        });
      }

      let closingSign = item.open.indexOf(days[now.getDay()]) !== -1 ? { opacity: '1' } : { opacity: '0' };
      return (
        <li key={index}>
          <div className={'head-title'}>
            <h1>{item.name}</h1>
            <h2>{`${item.distance}km`} </h2>
            <div className={'google-maps'}>
              <a href={`https://www.google.com/maps/search/?api=1&query=${stripchar.RSExceptUnsAlpNum(
                item.name)}+${item.address}+${item.city}`} target="_blank" >
                <img src={'http://pluspng.com/img-png/google-maps-png-google-maps-icon-1600.png'}/>
              </a>
            </div>
          </div>
          <div className={'address'}>
            <p>{item.address}</p>
            <p>{item.zipcode}</p>
            <p>{item.city}</p>
          </div>
          <div className={'bottom-container'}>
            <div style={closingSign} className={'open-closed'}><img
              src={'https://batensteinwoerden.nl/wp-content/uploads/sites/3/2015/05/gesloten.png'}/>
            </div>
            <div className={'beer-list-button'}
                 onClick={() => this.handleBeerList(item.name, index)}>Bieren Lijst
            </div>
          </div>
          <div key={index}
               style={this.state.beerListToggleState[index] ? {
                 height: '100px',
                 opacity: '1',
                 padding: '15px',
               } : { height: '0', opacity: '0', padding: '0px' }}
               className={'beer-list'}>
            {beerContent}
          </div>
        </li>
      );
    });
    return output;
  }

  render() {
    let content = this.renderResults(this.props.resultData)
    return (
      <div>
        <div className={'results'}>
          <ul>
            {content}
          </ul>
        </div>
      </div>
    );
  }
}

export default Results;
