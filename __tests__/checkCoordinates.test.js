import {checkCoordinates, check_lat_lon} from '../checkCoordinates';
//I need test distance > 1000 , distance = 1000 , distance < 1000, eche one empty, coordinates note valida

test('test checkCoordinates', () => {
  expect(
    checkCoordinates(
      {latitude: 32.0624445, longitude: 34.8463324},
      {latitude: 32.0548362, longitude: 34.8521932},
    ),
  ).toBe(true);
  expect(
    checkCoordinates(
      {latitude: 32.09202, longitude: 34.83783},
      {latitude: 32.09185, longitude: 34.83779},
    ),
  ).toBe(false);
  expect(checkCoordinates({latitude: 32.09202, longitude: 34.83783})).toBe(
    'I have to get coordinates and currentLocation',
  );
  expect(checkCoordinates({latitude: 32.09202, longitude: 34.83783}, {})).toBe(
    'missing data the Object < 2',
  );
  expect(
    checkCoordinates(
      {igyfy: 32.09202, longitude: 34.83783},
      {latitude: 32.09185, hjgfd: 23456},
    ),
  ).toBe('missing data latitude or longitude note exists');
  expect(
    checkCoordinates(
      {latitude: '232.09202', longitude: -434.83783},
      {latitude: '234.83783', longitude: '34.83779'},
    ),
  ).toBe('coordinates not valid');
  // expect(checkCoordinates()).toBe();
  // expect(checkCoordinates()).toBe();
  expect(check_lat_lon(32.0624445, 34.8463324)).toBe(true);
  expect(check_lat_lon('32.0548362', '34.8521932')).toBe(true);
  expect(check_lat_lon('32.09202', 34.83783)).toBe(true);
  expect(check_lat_lon('232.09202', '234.83783')).toBe(false);
});
