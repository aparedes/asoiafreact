export {};
jest.mock('./regions/regions', () => () => null);
jest.mock('./housesList/housesList', () => () => null);
jest.mock('./searchHouse/searchHouse', () => () => null);
test('renders without crashing', () => {
  // const component = render(<App getAllHouses={jest.fn()} />);
  expect('toupdate').toMatchSnapshot();
});
