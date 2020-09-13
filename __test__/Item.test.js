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
  /*
    'shallow' API just render the top level component, not the true HTML.
    Use 'debug' Method to find out which item to be tested.
  */ 
  const wrapper = shallow(<ItemComponent item={fakeItem}/>);
  // console.log('wrapper:', wrapper.debug());
  
  it('renders price tags & titles properly', () => {
    const PriceTag = wrapper.find('PriceTag');
    // console.log('PriceTag:', PriceTag.children());
    expect(PriceTag.children().text()).toBe('$500');
    
    expect(wrapper.find('Title a').text()).toBe(fakeItem.title);
  });
  
  it('renders the images properly', () => {
    const ImageTag = wrapper.find('img');
    expect(ImageTag.props().src).toBe(fakeItem.image);
    expect(ImageTag.props().alt).toBe(fakeItem.title);
  });
  
  it('renders out the buttons properly', () => {
    const ButtonList = wrapper.find('.buttonList');
    expect(ButtonList.children()).toHaveLength(3);

    console.log('ButtonList:', ButtonList.debug());
    expect(ButtonList.find('Link')).toHaveLength(1); // Or
    expect(ButtonList.find('Link').exists()).toBe(true);

    expect(ButtonList.find('DeleteItem').exists()).toBe(true);
  });
});