import React, { Component } from 'react';
import IntroBanner from './components/IntroBanner';
import QuickNavigation from './components/QuickNavigation';
import ReleaseIntro from './components/ReleaseIntro';
import SimpleBanner from './components/SimpleBanner';
import SimpleSlider from './components/SimpleSlider';

export default class HomeMain extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="member-manager-page">
        <IntroBanner />
        <QuickNavigation />
        <ReleaseIntro />
        <SimpleBanner />
        <SimpleSlider />
      </div>
    );
  }
}
