import React from 'react';
import Results from './Results/Results';
import './search.css';
import axios from 'axios';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      position: 0,
      searchbar: {},
      results: {},
      resultData: [],
      radius: '',
      spacer: {},
    };
    this.locatie = React.createRef();
    this.straal = React.createRef();
  }

  UNSAFE_componentWillMount() {
    this.listenToScroll();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.position !== this.state.position) {
      this.listenToScroll();
    }
  }

  componentDidMount() {
    this.listenToScroll();
    window.addEventListener('scroll', this.listenToScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.listenToScroll);
  }

  handleSubmit() {
    axios({
      method: 'post',
      url: '/api/distance',
      data: {
        locatie: this.locatie.current.value,
        straal: this.straal.current.value,
      }
    })
    .then(res => {
      this.setState({ resultData: res.data, radius: this.straal.current.value });
    });
  }

  listenToScroll = () => {
    const height = document.documentElement.scrollTop;
    this.setState({
      position: height,
      searchbar: this.state.position > 300 * 1.2 ? {
        position: 'fixed',
        top: '90px',
        marginTop: '0px',
      } : { position: 'relative', marginTop: '150px' },
      spacer: this.state.position > 300 * 1.2 ? {
        height: '250px',
        position: 'relative',
      } : { height: '0px', position: 'relative' },
    });
  };

  render() {
    return (
      <div>
        <div style={this.state.searchbar} className={'search-container'}>
          <input onKeyDown={(event)=> event.keyCode === 13 ? this.handleSubmit() : false} className={'searchBar'} placeholder={'Uw locatie'} ref={this.locatie}/>
          <select className={'select-radius'} ref={this.straal}>
            <option value="999999">Alle</option>
            <option value="25">25km</option>
            <option value="50">50km</option>
            <option value="100">100km</option>
          </select>
          <div className={'myButton'} onClick={() => this.handleSubmit()}>
            Zoek nu
          </div>
        </div>
        <div style={this.state.spacer}></div>
        <Results resultData={this.state.resultData} filterData={this.state.radius}/>
      </div>
    )
  }
}

export default Search;
