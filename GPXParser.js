import {gpxParser} from 'gpxparser';
// import './mapstogpx20221213_104222.gpx';

export const gpxfile = () => {
  console.log('gpx file');
  let gpx = new gpxParser();
  console.log(gpx.parse('mapstogpx20221213_104222.gpx'));
  let totalDistance = gpx.tracks[0].distance.total;
  gpx.tracks[0].points.push(['lat', 'longitude']);
  let geoJSON = gpx.toGeoJSON();
};
