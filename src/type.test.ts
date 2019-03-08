import {
  BaseSchema,
  Schema
} from 'swagger-schema-official';
import {
  getBasicType,
  getReferenceType,
  GroupedReferences,
  groupReferences
} from './type';
import {File} from './utils';

describe('type', () => {

  it('convert Swagger Schema type to TypeScript basic type', () => {
    const schema: BaseSchema = {
      type: 'array',
      items: {
        type: 'string'
      }
    };

    const expectedBasicType = {
      name: 'string[]',
      isArray: true
    };

    expect(getBasicType(schema)).toEqual(expectedBasicType);
  });

  it('convert Swagger Schema type to reference type', () => {
    const schema: Schema = {
      type: 'array',
      items: {
        $ref: '#/definitions/Tag'
      }
    };

    const expectedReferenceType = {
      name: 'Tag',
      isArray: true
    };

    expect(getReferenceType(schema)).toEqual(expectedReferenceType);
  });

  it('group references by template', () => {
    const files: File[] = [
      {
        name: 'Foo',
        file: 'foo',
        template: 'test'
      },
      {
        name: 'Bar',
        file: 'bar',
        template: 'test'
      }
    ];

    const group: GroupedReferences<File> = {
      test: [files[1], files[0]]
    };

    expect(groupReferences(files)).toEqual(group);
  });

});
