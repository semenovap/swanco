import {
  addEnum,
  Enum,
  fetchEnums,
  findEnum
} from './enums';

describe('enums', () => {

  const expectedEnum: Enum = {
    name: 'FooBar',
    file: `foo-bar.enum`,
    template: 'enum',
    description: undefined,
    values: [
      {
        key: 'One',
        value: 'one'
      },
      {
        key: 'Two',
        value: 'two'
      }
    ]
  };

  it('add empty enum', () => {
    expect(addEnum('foo', 'empty', {})).toBeUndefined();
  });

  it('add enum', () => {
    expect(addEnum('foo', 'bar', {enum: ['one', 'two']})).toEqual(expectedEnum);
  });

  it('add enum with the same values', () => {
    expect(addEnum('foo', 'baz', {items: {enum: ['one', 'two']}})).toEqual(expectedEnum);
  });

  it('try to find enum by empty values', () => {
    expect(findEnum([])).toBeUndefined();
  });

  it('try to find exists enum', () => {
    expect(findEnum(expectedEnum.values)).toEqual(expectedEnum);
  });

  it('try to find exists enum again', () => {
    expect(findEnum([{key: 'foo', value: 'bar'}])).toBeUndefined();
  });

  it('fetch all enums', () => {
    expect(fetchEnums()).toEqual([expectedEnum]);
  });

});
