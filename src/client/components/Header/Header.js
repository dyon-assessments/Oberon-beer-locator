import React from "react";
import './header.css';
import { FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      position: 0,
      dropdownToggle: false,
      dropdown: { height: '0vh', opacity: '0' },
      sticky: { height: 300 - (this.position / 1.2) },
      dropdownContainer: {},
      button: { display: 'none' },
    };
    this.dropdownHandler = this.dropdownHandler.bind(this);
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

  listenToScroll = () => {
    const height = document.documentElement.scrollTop;
    this.setState({
      position: height,
      sticky: { height: `${this.state.position / 1.2 <= 300 ? this.state.dropdownToggle ? 0 : 300 - (this.state.position / 1.2) : 0}px` },
    });
  };

  dropdownHandler() {
    this.setState({
      dropdown: this.state.dropdownToggle ? { height: '0vh', opacity: '0' } : {
        height: '100vh',
        opacity: '1',
      },
      dropdownToggle: !this.state.dropdownToggle,
      sticky: this.state.dropdownToggle ? { height: 300 - (this.state.position / 1.2) } : { height: '0px' },
      dropdownContainer: this.state.dropdownToggle ? { height: '300px' } : { height: '0px' },
      button: this.state.dropdownToggle ? { display: 'none' } : { display: 'block' },
    });
  }

  render() {
    return (
      <div>
        <div style={this.state.dropdownContainer} className={'container'}>
          <header style={this.state.header} className={'header'}>
            <div style={this.state.sticky} className={'sticky-header'}>
              <div className={'overlay'}>
                <img className={'logo'} src={'src/client/components/logo.png'}/>
              </div>
            </div>
            <div className={'fixed-header'}>
              <FaBars color={'white'} size={'70px'} className={'hamburger-icon'}
                      onClick={() => this.dropdownHandler()}/>
            </div>
            <div style={this.state.dropdown} className={'dropdown'}>
              <Link style={this.state.button} className={'button-menu'} to="/">Home</Link>
              <Link style={this.state.button} className={'button-menu'}
                    to="/addbrewery">Voeg Toe</Link>
            </div>
          </header>
        </div>
      </div>
    );
  }
}
