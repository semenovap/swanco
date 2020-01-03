import {resolve} from 'path';
import {Spec} from 'swagger-schema-official';
import {Enum} from './enums';
import {
  fetchModels,
  findModel,
  Model
} from './models';
import {getData} from './utils';

describe('models', () => {

  let source: Spec;

  let spec: Spec;
  let enumOrderStatus: Enum;
  let enumPetStatus: Enum;
  let order: Model;
  let user: Model;
  let category: Model;
  let tag: Model;
  let pet: Model;
  let apiResponse: Model;
  let models: Model[];

  beforeAll(async () => source = await getData(resolve(__dirname, '../fixture.test.json')));

  beforeEach(() => {
    spec = JSON.parse(JSON.stringify(source));

    enumOrderStatus = {
      values: [
        {
          key: 'Approved',
          value: 'approved'
        },
        {
          key: 'Delivered',
          value: 'delivered'
        },
        {
          key: 'Placed',
          value: 'placed'
        }
      ],
      description: 'Order Status',
      template: 'enum',
      name: 'OrderStatus',
      file: 'order-status.enum',
      isArray: false
    };

    enumPetStatus = {
      values: [
        {
          key: 'Available',
          value: 'available'
        },
        {
          key: 'Pending',
          value: 'pending'
        },
        {
          key: 'Sold',
          value: 'sold'
        }
      ],
      description: 'pet status in the store',
      template: 'enum',
      name: 'PetStatus',
      file: 'pet-status.enum',
      isArray: false
    };

    order = {
      name: 'Order',
      title: 'Order',
      file: 'order.model',
      description: undefined,
      generics: [],
      extended: [],
      references: {
        enum: [
          enumOrderStatus
        ]
      },
      properties: [
        {
          type: 'boolean',
          isArray: false,
          name: 'complete',
          description: undefined,
          reference: undefined,
          required: false,
          hashMap: undefined
        },
        {
          type: 'number',
          isArray: false,
          name: 'id',
          description: undefined,
          reference: undefined,
          required: false,
          hashMap: undefined
        },
        {
          type: 'number',
          isArray: false,
          name: 'petId',
          description: undefined,
          reference: undefined,
          required: false,
          hashMap: undefined
        },
        {
          type: 'number',
          isArray: false,
          name: 'quantity',
          description: undefined,
          reference: undefined,
          required: false,
          hashMap: undefined
        },
        {
          type: 'string',
          isArray: false,
          name: 'shipDate',
          description: undefined,
          reference: undefined,
          required: false,
          hashMap: undefined
        },
        {
          type: 'OrderStatus',
          isArray: false,
          name: 'status',
          description: 'Order Status',
          reference: enumOrderStatus,
          required: false,
          hashMap: undefined
        }
      ],
      template: 'model'
    };

    user = {
      name: 'User',
      title: 'User',
      file: 'user.model',
      description: undefined,
      generics: [],
      extended: [],
      references: {},
      properties: [
        {
          type: 'string',
          isArray: false,
          name: 'email',
          description: undefined,
          reference: undefined,
          required: false,
          hashMap: undefined
        },
        {
          type: 'string',
          isArray: false,
          name: 'firstName',
          description: undefined,
          reference: undefined,
          required: false,
          hashMap: undefined
        },
        {
          type: 'number',
          isArray: false,
          name: 'id',
          description: undefined,
          reference: undefined,
          required: false,
          hashMap: undefined
        },
        {
          type: 'string',
          isArray: false,
          name: 'lastName',
          description: undefined,
          reference: undefined,
          required: false,
          hashMap: undefined
        },
        {
          type: 'string',
          isArray: false,
          name: 'password',
          description: undefined,
          reference: undefined,
          required: false,
          hashMap: undefined
        },
        {
          type: 'string',
          isArray: false,
          name: 'phone',
          description: undefined,
          reference: undefined,
          required: false,
          hashMap: undefined
        },
        {
          type: 'number',
          isArray: false,
          name: 'userStatus',
          description: 'User Status',
          reference: undefined,
          required: false,
          hashMap: undefined
        },
        {
          type: 'string',
          isArray: false,
          name: 'username',
          description: undefined,
          reference: undefined,
          required: false,
          hashMap: undefined
        }
      ],
      template: 'model'
    };

    category = {
      name: 'Category',
      title: 'Category',
      file: 'category.model',
      description: undefined,
      generics: [],
      extended: [],
      references: {},
      properties: [
        {
          type: 'number',
          isArray: false,
          name: 'id',
          description: undefined,
          reference: undefined,
          required: false,
          hashMap: undefined
        },
        {
          type: 'string',
          isArray: false,
          name: 'name',
          description: undefined,
          reference: undefined,
          required: false,
          hashMap: undefined
        }
      ],
      template: 'model'
    };

    tag = {
      name: 'Tag',
      title: 'Tag',
      file: 'tag.model',
      description: undefined,
      generics: [],
      extended: [],
      references: {},
      properties: [
        {
          type: 'number',
          isArray: false,
          name: 'id',
          description: undefined,
          reference: undefined,
          required: false,
          hashMap: undefined
        },
        {
          type: 'string',
          isArray: false,
          name: 'name',
          description: undefined,
          reference: undefined,
          required: false,
          hashMap: undefined
        }
      ],
      template: 'model'
    };

    pet = {
      name: 'Pet',
      title: 'Pet',
      file: 'pet.model',
      description: undefined,
      generics: [],
      extended: [],
      references: {
        model: [
          category,
          tag
        ],
        enum: [
          enumPetStatus
        ]
      },
      properties: [
        {
          type: 'Category',
          isArray: false,
          name: 'category',
          description: undefined,
          reference: category,
          required: false,
          hashMap: undefined
        },
        {
          type: 'number',
          isArray: false,
          name: 'id',
          description: undefined,
          reference: undefined,
          required: false,
          hashMap: undefined
        },
        {
          type: 'string',
          isArray: false,
          name: 'name',
          description: undefined,
          reference: undefined,
          required: true,
          hashMap: undefined
        },
        {
          type: 'string',
          isArray: true,
          name: 'photoUrls',
          description: undefined,
          reference: undefined,
          required: true,
          hashMap: undefined
        },
        {
          type: 'PetStatus',
          isArray: false,
          name: 'status',
          description: 'pet status in the store',
          reference: enumPetStatus,
          required: false,
          hashMap: undefined
        },
        {
          type: 'Tag',
          isArray: true,
          name: 'tags',
          description: undefined,
          reference: tag,
          required: false,
          hashMap: undefined
        }
      ],
      template: 'model'
    };

    apiResponse = {
      name: 'ApiResponse',
      title: 'ApiResponse',
      file: 'api-response.model',
      description: undefined,
      generics: [],
      extended: [],
      references: {},
      properties: [
        {
          type: 'number',
          isArray: false,
          name: 'code',
          description: undefined,
          reference: undefined,
          required: false,
          hashMap: undefined
        },
        {
          type: 'string',
          isArray: false,
          name: 'message',
          description: undefined,
          reference: undefined,
          required: false,
          hashMap: undefined
        },
        {
          type: 'string',
          isArray: false,
          name: 'type',
          description: undefined,
          reference: undefined,
          required: false,
          hashMap: undefined
        }
      ],
      template: 'model'
    };

    models = [order, user, category, tag, pet, apiResponse];
  });

  it('has no definitions', () => {
    delete spec.definitions;
    expect(fetchModels(spec)).toEqual([]);
  });

  it('try to find model by name', () => {
    expect(findModel('Bar')).toBeUndefined();
  });

  it('fetch all models', async () => {
    expect(fetchModels(spec)).toEqual(models);
  });

  it('try to find model by name again', () => {
    expect(findModel('Pet')).toEqual(pet);
  });

  it('should be part of some other models', () => {
    spec.definitions.Foo = {
      allOf: [
        {
          $ref: '#/definitions/Tag'
        },
        {
          properties: {
            rootCause: {
              type: 'string'
            }
          }
        },
        {
          type: 'string'
        }
      ]
    };

    const foo: Model = {
      description: undefined,
      extended: [
        tag
      ],
      file: 'foo.model',
      generics: [],
      name: 'Foo',
      properties: [
        {
          description: undefined,
          hashMap: undefined,
          isArray: false,
          name: 'rootCause',
          reference: undefined,
          required: false,
          type: 'string',
        },
      ],
      references: {
        model: [
          tag
        ]
      },
      template: 'model',
      title: 'Foo'
    };

    expect(fetchModels(spec)).toEqual([...models, foo]);
  });

  it('should have additional properties', () => {
    spec.definitions.Foo = {
      properties: {
        foo: {
          type: 'object'
        },
        bar: {
          type: 'object',
          additionalProperties: {
            type: 'string'
          }
        },
        baz: {
          type: 'object',
          additionalProperties: true
        }
      }
    };

    const foo: Model = {
      description: undefined,
      extended: [],
      file: 'foo.model',
      generics: [
        'FooFoo',
      ],
      name: 'Foo',
      properties: [
        {
          description: undefined,
          hashMap: {
            generics: [],
            hashMap: undefined,
            isArray: false,
            reference: undefined,
            type: 'string'
          },
          isArray: false,
          name: 'bar',
          reference: undefined,
          required: false,
          type: 'object'
        },
        {
          description: undefined,
          hashMap: undefined,
          isArray: false,
          name: 'baz',
          reference: undefined,
          required: false,
          type: 'object'
        },
        {
          description: undefined,
          hashMap: undefined,
          isArray: false,
          name: 'foo',
          reference: undefined,
          required: false,
          type: 'FooFoo'
        }
      ],
      references: {},
      template: 'model',
      title: 'Foo',
    };
    expect(fetchModels(spec)).toEqual([...models, foo]);
  });

  it('cannot find reference model', () => {
    spec.definitions.Pet.properties.category.$ref = '#/definitions/Foo';
    expect(() => fetchModels(spec)).toThrowError();
  });

  it('cannot find extended reference model', () => {
    spec.definitions.Foo = {
      allOf: [
        {
          $ref: '#/definitions/Bar'
        }
      ]
    };
    expect(() => fetchModels(spec)).toThrowError();
  });

});
