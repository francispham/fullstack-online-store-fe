function Person(name, foods) {
  this.name = name;
  this.foods = foods;
};

Person.prototype.fetchFavFoods = function() {
  return new Promise((resolve, reject) =>{
    // Simulate an API
    setTimeout(() => resolve(this.foods), 2000);
  });
};

describe('mocking 101', () => {
  it('mock a reg function', () => {
    const fetchDogs = jest.fn();
    fetchDogs('snickers');
    expect(fetchDogs).toHaveBeenCalled();
    expect(fetchDogs).toHaveBeenCalledWith('snickers');
    fetchDogs('hugo');
    expect(fetchDogs).toHaveBeenCalledTimes(2);
  });

  it('can create a person', () => {
    const me = new Person('Francis', ['pho', 'coffee']);
    expect(me.name).toBe('Francis');
  });

  it('can fetch foods', async () => {
    const me = new Person('Francis', ['pho', 'coffee']);
    
    // Mock the faFoods function
    me.fetchFavFoods = jest.fn().mockResolvedValue(['sushi', 'ramen']);
    const favFoods = await me.fetchFavFoods();
    console.log('favFoods:', favFoods)
    expect(favFoods).toContain('ramen');
  })
});
