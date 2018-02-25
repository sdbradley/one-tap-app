import React, { Component } from 'react';
import Link from 'components/link';
import { connect } from 'react-redux';
import {CirclePie} from 'react-simple-charts'

class ConversionRateChart extends Component {

  render() {
    return (
      <div>
        {this.props.data
          ? this.props.data.map(item => <div key={item.id} className="ConversionRateChart-container"><CirclePie percent={item.conversionrate*100}/><h3>{item.account}</h3></div>)
          : null
        }
      </div>
    );
  }
}

export default connect(null, null)(ConversionRateChart)
