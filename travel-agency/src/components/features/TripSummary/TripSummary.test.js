import React from 'react';
import {shallow} from 'enzyme';
import TripSummary from './TripSummary';

describe('Component TripSummary', () => {

  it('should render correct url', () => {
    const expectedURL = 'Lorem';
    const component = shallow(<TripSummary id={expectedURL} tags={[]} />);
    expect(component.find('.link').prop('to')).toEqual(`/trip/${expectedURL}`);
  });

  it('should render images', () => {
    const expectedSRC = 'image';
    const expectedALT = 'Lorem';
    const component = shallow(<TripSummary image={expectedSRC} name={expectedALT} tags={[]} />);
    expect(component.find('img').prop('src')).toEqual(expectedSRC);
    expect(component.find('img').prop('alt')).toEqual(expectedALT);
  });

  it('should render proper props - name, cost, days', () => {
    const expectedName = 'name';
    const expectedCost = '100';
    const expectedDays = 7;
    const component = shallow(<TripSummary name={expectedName} cost={expectedCost} days={expectedDays} tags={[]} />);
    expect(component.find('.title').text()).toEqual(expectedName);
    expect(component.find('.details').text()).toEqual(`${expectedDays} daysfrom ${expectedCost}`);

  });

  it('should throw error without required props',() => {
    expect(() => shallow(<TripSummary />)).toThrow();
  });

  it('should check if tags are rendered in proper order', () => {
    const tagsArray=['red', 'yellow', 'green'];
    const component = shallow(<TripSummary tags={tagsArray} />);
    expect(component.find('.tags span').at(0)).toEqual[tagsArray[0]];
    expect(component.find('.tags span').at(1)).toEqual[tagsArray[1]];
    expect(component.find('.tags span').at(2)).toEqual[tagsArray[2]];
  });

  it('should not render tags if props = undefined', () => {
    const component = shallow(<TripSummary tags={[]} />);
    expect(component.find('div.tags').exists()).toEqual(true);
  });

});