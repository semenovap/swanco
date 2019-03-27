import {resolve} from 'path';
import {Spec} from 'swagger-schema-official';
import {
  fetchModels,
  findModel,
  Model
} from './models';
import {getData} from './utils';

describe('models', () => {

  let spec: Spec;

  beforeAll(async () => spec = await getData(resolve(__dirname, '../fixture.test.json')));

  const order: Model = {
    name: 'Order',
    file: 'order.model',
    references: {
      enum: [
        {
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
        }
      ]
    },
    properties: [
      {
        type: 'boolean',
        isArray: false,
        name: 'complete',
        description: undefined,
        required: false
      },
      {
        type: 'number',
        isArray: false,
        name: 'id',
        description: undefined,
        required: false
      },
      {
        type: 'number',
        isArray: false,
        name: 'petId',
        description: undefined,
        required: false
      },
      {
        type: 'number',
        isArray: false,
        name: 'quantity',
        description: undefined,
        required: false
      },
      {
        type: 'string',
        isArray: false,
        name: 'shipDate',
        description: undefined,
        required: false
      },
      {
        type: 'OrderStatus',
        isArray: false,
        name: 'status',
        description: 'Order Status',
        required: false
      }
    ],
    template: 'model'
  };

  const user: Model = {
    name: 'User',
    file: 'user.model',
    references: {},
    properties: [
      {
        type: 'string',
        isArray: false,
        name: 'email',
        description: undefined,
        required: false
      },
      {
        type: 'string',
        isArray: false,
        name: 'firstName',
        description: undefined,
        required: false
      },
      {
        type: 'number',
        isArray: false,
        name: 'id',
        description: undefined,
        required: false
      },
      {
        type: 'string',
        isArray: false,
        name: 'lastName',
        description: undefined,
        required: false
      },
      {
        type: 'string',
        isArray: false,
        name: 'password',
        description: undefined,
        required: false
      },
      {
        type: 'string',
        isArray: false,
        name: 'phone',
        description: undefined,
        required: false
      },
      {
        type: 'number',
        isArray: false,
        name: 'userStatus',
        description: 'User Status',
        required: false
      },
      {
        type: 'string',
        isArray: false,
        name: 'username',
        description: undefined,
        required: false
      }
    ],
    template: 'model'
  };

  const category: Model = {
    name: 'Category',
    file: 'category.model',
    references: {},
    properties: [
      {
        type: 'number',
        isArray: false,
        name: 'id',
        description: undefined,
        required: false
      },
      {
        type: 'string',
        isArray: false,
        name: 'name',
        description: undefined,
        required: false
      }
    ],
    template: 'model'
  };

  const tag: Model = {
    name: 'Tag',
    file: 'tag.model',
    references: {},
    properties: [
      {
        type: 'number',
        isArray: false,
        name: 'id',
        description: undefined,
        required: false
      },
      {
        type: 'string',
        isArray: false,
        name: 'name',
        description: undefined,
        required: false
      }
    ],
    template: 'model'
  };

  const pet: Model = {
    name: 'Pet',
    file: 'pet.model',
    references: {
      model: [
        category,
        tag
      ],
      enum: [
        {
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
        }
      ]
    },
    properties: [
      {
        type: 'Category',
        isArray: false,
        name: 'category',
        description: undefined,
        required: false
      },
      {
        type: 'number',
        isArray: false,
        name: 'id',
        description: undefined,
        required: false
      },
      {
        type: 'string',
        isArray: false,
        name: 'name',
        description: undefined,
        required: true
      },
      {
        type: 'string',
        isArray: true,
        name: 'photoUrls',
        description: undefined,
        required: true
      },
      {
        type: 'PetStatus',
        isArray: false,
        name: 'status',
        description: 'pet status in the store',
        required: false
      },
      {
        type: 'Tag',
        isArray: true,
        name: 'tags',
        description: undefined,
        required: false
      }
    ],
    template: 'model'
  };

  const apiResponse: Model = {
    name: 'ApiResponse',
    file: 'api-response.model',
    references: {},
    properties: [
      {
        type: 'number',
        isArray: false,
        name: 'code',
        description: undefined,
        required: false
      },
      {
        type: 'string',
        isArray: false,
        name: 'message',
        description: undefined,
        required: false
      },
      {
        type: 'string',
        isArray: false,
        name: 'type',
        description: undefined,
        required: false
      }
    ],
    template: 'model'
  };

  it('try to find model by name', () => {
    expect(findModel('Foo')).toBeUndefined();
  });

  it('fetch all models', async () => {
    expect(fetchModels(spec)).toEqual([order, user, category, tag, pet, apiResponse]);
  });

  it('try to find model by name again', () => {
    expect(findModel('Pet')).toEqual(pet);
  });

});
