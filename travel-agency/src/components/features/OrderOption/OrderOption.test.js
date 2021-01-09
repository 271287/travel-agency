import React from 'react';
import { shallow } from 'enzyme';
import OrderOption from './OrderOption';
import DatePicker from 'react-datepicker';

describe('Component OrderOption', () => {
  it('should render without crashing', () => {
    const component = shallow(<OrderOption type='Lorem' name='Lorem' />);
    expect(component).toBeTruthy();
  });
  it('should return empty object if called without required props', () => {
    const component = shallow(<OrderOption />);
    expect(component).toEqual({});
  });
  it('should show title if given props name', () => {
    const properTitle = 'title';
    const component = shallow(<OrderOption name='title' />);
    expect(component.find('.title')).toEqual(properTitle);
  });
  const optionTypes = {
    dropdown: 'OrderOptionDropdown',
    icons: 'OrderOptionIcons',
    checkboxes: 'OrderOptionCheckboxes',
    number: 'OrderOptionNumber',
    text: 'OrderOptionText',
    date: 'OrderOptionDate',
  };

  const mockProps = {
    id: 'abc',
    name: 'Lorem',
    values: [
      { id: 'aaa', icon: 'h-square', name: 'Lorem A', price: 0 },
      { id: 'xyz', icon: 'h-square', name: 'Lorem X', price: 100 },
    ],
    required: false,
    currentValue: 'aaa',
    price: '50%',
    limits: {
      min: 0,
      max: 6,
    },
  };
  const mockPropsForType = {
    dropdown: {},
    icons: {},
    checkboxes: { currentValue: [mockProps.currentValue] },
    number: { currentValue: 1 },
    text: {},
    date: {},
  };
  const testValue = mockProps.values[1].id;
  const testValueNumber = 3;

  for (let type in optionTypes) {
    describe(`Component OrderOption with type=${type}`, () => {
      /* test setup */
      let component;
      let subcomponent;
      let renderedSubcomponent;
      let mockSetOrderOption;

      beforeEach(() => {
        mockSetOrderOption = jest.fn();
        component = shallow(
          <OrderOption
            type={type}
            setOrderOption={mockSetOrderOption}
            {...mockProps}
            {...mockPropsForType[type]}
          />
        );
        subcomponent = component.find(optionTypes[type]);
        renderedSubcomponent = subcomponent.dive();
      });
      /* common tests */
      it(`renders ${optionTypes[type]}`, () => {
        expect(subcomponent).toBeTruthy();
        expect(subcomponent.length).toBe(1);
      });
      /* type-specific tests */
      switch (type) {
        case 'dropdown': {
          /* tests for dropdown */
          it('contains select and options', () => {

            const select = renderedSubcomponent.find('select');
            expect(select.length).toBe(1);

            const emptyOption = select.find('option[value=""]').length;
            expect(emptyOption).toBe(1);

            const options = select.find('option').not('[value=""]');
            expect(options.length).toBe(mockProps.values.length);
            expect(options.at(0).prop('value')).toBe(mockProps.values[0].id);
            expect(options.at(1).prop('value')).toBe(mockProps.values[1].id);
          });

          it('should run setOrderOption function on change', () => {
            renderedSubcomponent.find('select').simulate('change', { currentTarget: { value: testValue } });
            expect(mockSetOrderOption).toBeCalledTimes(1);
            expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValue });
          });
          break;
        }

        case 'icons': {
          /* tests for icons */
          it('should render correct name', () => {
            const name = renderedSubcomponent.find('name');
            expect(name.lenght).toBe(0);
          });
          it('should simulate click on last div with .icon', () => {
            renderedSubcomponent.last('div.icon').simulate('click');
            expect(mockSetOrderOption).toBeCalledTimes(0);
          });
          break;
        }

        case 'checkboxes': {
          /* tests for checkboxes */
          it('should find input with value = testValue and run setOrderOption function on change', () => {
            const expectedValue = renderedSubcomponent.find(`input[value="${testValue}"]`);
            expect(expectedValue.lenght).toBe(1);
      
            expectedValue.simulate('change', {currentTarget: {checked: true}});
            expect(mockSetOrderOption).toBeCalledTimes(1);
            expect(mockSetOrderOption).toBeCalledWith({ [mockProps.currentValue]: testValue });
          });
          break;
        }

        case 'number': {
          /* tests for number */
          it('should find input', () => {
            const input = renderedSubcomponent.find('input');
            expect(input.length).toBe(1);
          });
          it('should run setOrderOption function on change', () => {
            renderedSubcomponent.find('input').simulate('change', { currentTarget: { value: testValueNumber } });
            expect(mockSetOrderOption).toBeCalledTimes(1);
            expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValueNumber });
          });
          break;
        }

        case 'text': {
          /* tests for text */
          it('should find input', () => {
            const input = renderedSubcomponent.find('input');
            expect(input.length).toBe(1);
          });
          it('should run setOrderOption function on change', () => {
            renderedSubcomponent.find('input').simulate('change', { currentTarget: { value: testValue } });
            expect(mockSetOrderOption).toBeCalledTimes(1);
            expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValue });
          });
          break;
        }

        case 'date': {
          /* tests for date */
          it('should find component DatePicker and run setOrderOption function on datechange', () => {
            const datepicker = renderedSubcomponent.find(DatePicker);
            expect(datepicker.length).toBe(1);
         
            datepicker.simulate('change', testValue);
            expect(mockSetOrderOption).toBeCalledTimes(1);
            expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValue });
          });
        }
      }
    });
  }
});
