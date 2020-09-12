//  Docs: https://enzymejs.github.io/enzyme/docs/api/shallow.html
import { shallow } from 'enzyme';

import ItemComponent from '../components/Item';

const fakeItem = {
  id: 'My id',
  title: 'My Item',
  price: 50000,
  description: 'This is an Item',
  image: 'dog.jpg',
  largeImage: 'largeDog.jpg',
};

describe('<Item />', () => {
  it('renders and displays properly', () => {
    const wrapper = shallow(<ItemComponent item={fakeItem}/>);
    // 'shallow' just render the top level component, not the true HTML
    console.log('wrapper:', wrapper.debug());
  })
})