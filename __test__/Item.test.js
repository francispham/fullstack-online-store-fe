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
    // console.log('wrapper:', wrapper.debug());

    const PriceTag = wrapper.find('PriceTag');
    console.log('PriceTag:', PriceTag.children());
    expect(PriceTag.children().text()).toBe('$500');
    expect(wrapper.find('Title a').text()).toBe(fakeItem.title);
    const ImageTag = wrapper.find('img');
    expect(ImageTag.props().src).toBe(fakeItem.image);
    expect(ImageTag.props().alt).toBe(fakeItem.title);
  })
})