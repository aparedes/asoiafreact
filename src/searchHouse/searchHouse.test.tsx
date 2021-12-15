import { render } from '../../tests/test-utils';
import SearchHouse from './searchHouse';

test('Prints a list o<f houses', () => {
  const { container } = render(<SearchHouse />);

  expect(container).toMatchSnapshot();
});
