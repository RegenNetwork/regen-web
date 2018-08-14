import React from 'react';
import { withTheme } from '@material-ui/core/styles';
import * as turf from '@turf/turf';

class PolygonIcon extends React.Component {

  render() {
    const { theme, polygon } = this.props;
    let coordinates = "";
    let turfCollection = [];

    polygon.coordinates[0].forEach((point) => {
      coordinates += `${point[0]},${point[1]} `;
      let turfPoint = turf.point(point);
      turfCollection.push(turfPoint);
    });

    const features = turf.featureCollection(turfCollection);
    const center = turf.center(features);
    const centerPoint = center.geometry.coordinates;
    const viewbox = `${centerPoint[0]} ${centerPoint[1]} 2 2`;

    const styles = {
      fillColor: theme.palette.accent.yellow,
      color: theme.palette.common.white
    };

    return (
      <div>
        <svg viewBox={viewbox} width="50" height="50" overflow="visible" xmlns="http://www.w3.org/2000/svg">
          <polygon points={coordinates} x="1" y="1"
                stroke={styles.fillColor} />
        </svg>
      </div>
    );
  }
}

export default withTheme()(PolygonIcon);
