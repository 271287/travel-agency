import React from 'react';
import styles from './TelephoneNumber.scss';
//import PropTypes from 'prop-types';
//import {formatTime} from '../../../utils/formatTime';

class TelephoneNumber extends React.Component {
  constructor() {
    super();
    setInterval(() => {
      this.forceUpdate();
    }, 1000);
  }

  getCountdownTime() {
    const currentTime = new Date();
    const officeClose = new Date(
      Date.UTC(
        currentTime.getUTCFullYear(),
        currentTime.getUTCMonth(),
        currentTime.getUTCDate(),
        22,
        0,
        0,
        0,
      ),
    );
    const amandaShift = new Date(
      Date.UTC(
        currentTime.getUTCFullYear(),
        currentTime.getUTCMonth(),
        currentTime.getUTCDate(),
        8,
        0,
        0,
        0,
      ),
    );
    const tobiasShift = new Date(
      Date.UTC(
        currentTime.getUTCFullYear(),
        currentTime.getUTCMonth(),
        currentTime.getUTCDate(),
        12,
        0,
        0,
        0,
      ),
    );
    const helenaShift = new Date(
      Date.UTC(
        currentTime.getUTCFullYear(),
        currentTime.getUTCMonth(),
        currentTime.getUTCDate(),
        16,
        0,
        0,
        0,
      ),
    );

    if (
      currentTime.getTime() > amandaShift.getTime() &&
      currentTime.getTime() < tobiasShift.getTime()
    ) {
      return `Amanda, 678.243.8455`;
    } else if (
      currentTime.getTime() > tobiasShift.getTime() &&
      currentTime.getTime() < helenaShift.getTime()
    ) {
      return 'Tobias, 278.443.6443';
    } else if (
      currentTime.getTime() > helenaShift.getTime() &&
      currentTime.getTime() < officeClose.getTime()
    ) {
      return 'Helena, 167.280.3970';
    } else {
      return 'Office closed';
    }
  }

  render() {
    return (
      <div className={styles.component}>
        {this.getCountdownTime() === 'Office closed' ? null : (
          <h3 className={styles.title}>Please contact us at:</h3>
        )}
        <div className={styles.promoDescription}>{this.getCountdownTime()}</div>
      </div>
    );
  }
}

export default TelephoneNumber;