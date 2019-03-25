import {resolve} from 'path';
import {Spec} from 'swagger-schema-official';
import {Config} from './config';
import {
  fetchServices,
  Service
} from './services';
import {getData} from './utils';

describe('services', () => {

  let spec: Spec;

  beforeAll(async () => spec = await getData(resolve(__dirname, '../fixture.test.json')));

  const config: Config = {
    baseUrl: '/',
    apiKeys: false,
    accessTokens: false,
    name: 'ConfigService',
    file: 'config.service',
    template: 'config'
  };

  const services: Service[] = [
    {
      name: 'PetService',
      description: 'Everything about your Pets',
      externalDocs: {
        description: 'Find out more',
        url: 'http://swagger.io'
      },
      config,
      file: 'pet.service',
      operations: [
        {
          name: 'addPet',
          parameters: [
            {
              type: 'Pet',
              name: 'body',
              description: 'Pet object that needs to be added to the store',
              required: true,
              inHeader: false,
              inBody: true,
              inQuery: false,
              inFormData: false,
              isArray: false,
              originalName: 'body'
            }
          ],
          method: 'post',
          url: '/pet',
          contentType: 'application/json',
          hasQueryParams: false,
          hasFormData: false,
          response: {
            type: 'void',
            reference: undefined,
            description: undefined,
            isArray: false
          },
          security: {
            apiKeys: [],
            tokens: [
              'petstore_auth'
            ]
          },
          summary: 'Add a new pet to the store',
          description: '',
          deprecated: undefined
        },
        {
          name: 'deletePet',
          parameters: [
            {
              type: 'number',
              name: 'petId',
              description: 'Pet id to delete',
              required: true,
              inHeader: false,
              inBody: false,
              inQuery: false,
              inFormData: false,
              isArray: false,
              originalName: 'petId'
            },
            {
              type: 'string',
              name: 'apiKey',
              description: undefined,
              required: false,
              inHeader: true,
              inBody: false,
              inQuery: false,
              inFormData: false,
              isArray: false,
              originalName: 'api_key'
            }
          ],
          method: 'delete',
          url: '/pet/${petId}',
          contentType: 'application/json',
          hasQueryParams: false,
          hasFormData: false,
          response: {
            type: 'void',
            reference: undefined,
            description: undefined,
            isArray: false
          },
          security: {
            apiKeys: [],
            tokens: [
              'petstore_auth'
            ]
          },
          summary: 'Deletes a pet',
          description: '',
          deprecated: undefined
        },
        {
          name: 'findPetsByStatus',
          parameters: [
            {
              type: 'PetFindPetsByStatus',
              reference: {
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
                template: 'enum',
                name: 'PetFindPetsByStatus',
                description: undefined,
                file: 'pet-find-pets-by-status.enum',
                isArray: false
              },
              name: 'status',
              description: 'Status values that need to be considered for filter',
              required: true,
              inHeader: false,
              inBody: false,
              inQuery: true,
              inFormData: false,
              isArray: true,
              originalName: 'status'
            }
          ],
          method: 'get',
          url: '/pet/findByStatus',
          contentType: 'application/json',
          hasQueryParams: true,
          hasFormData: false,
          response: {
            type: 'Pet',
            reference: undefined,
            description: 'successful operation',
            isArray: true
          },
          security: {
            apiKeys: [],
            tokens: [
              'petstore_auth'
            ]
          },
          summary: 'Finds Pets by status',
          description: 'Multiple status values can be provided with comma separated strings',
          deprecated: undefined
        },
        {
          name: 'findPetsByTags',
          parameters: [
            {
              type: 'string[]',
              name: 'tags',
              description: 'Tags to filter by',
              required: true,
              inHeader: false,
              inBody: false,
              inQuery: true,
              inFormData: false,
              isArray: true,
              originalName: 'tags'
            }
          ],
          method: 'get',
          url: '/pet/findByTags',
          contentType: 'application/json',
          hasQueryParams: true,
          hasFormData: false,
          response: {
            type: 'Pet',
            reference: undefined,
            description: 'successful operation',
            isArray: true
          },
          security: {
            apiKeys: [],
            tokens: [
              'petstore_auth'
            ]
          },
          summary: 'Finds Pets by tags',
          description: 'Multiple tags can be provided with comma separated strings. Use tag1, tag2, tag3 for testing.',
          deprecated: true
        },
        {
          name: 'getPetById',
          parameters: [
            {
              type: 'number',
              name: 'petId',
              description: 'ID of pet to return',
              required: true,
              inHeader: false,
              inBody: false,
              inQuery: false,
              inFormData: false,
              isArray: false,
              originalName: 'petId'
            }
          ],
          method: 'get',
          url: '/pet/${petId}',
          contentType: 'application/json',
          hasQueryParams: false,
          hasFormData: false,
          response: {
            type: 'Pet',
            reference: undefined,
            description: 'successful operation',
            isArray: false
          },
          security: {
            apiKeys: [
              {
                name: 'api_key',
                inHeader: true
              }
            ],
            tokens: []
          },
          summary: 'Find pet by ID',
          description: 'Returns a single pet',
          deprecated: undefined
        },
        {
          name: 'updatePet',
          parameters: [
            {
              type: 'Pet',
              name: 'body',
              description: 'Pet object that needs to be added to the store',
              required: true,
              inHeader: false,
              inBody: true,
              inQuery: false,
              inFormData: false,
              isArray: false,
              originalName: 'body'
            }
          ],
          method: 'put',
          url: '/pet',
          contentType: 'application/json',
          hasQueryParams: false,
          hasFormData: false,
          response: {
            type: 'void',
            reference: undefined,
            description: undefined,
            isArray: false
          },
          security: {
            apiKeys: [],
            tokens: [
              'petstore_auth'
            ]
          },
          summary: 'Update an existing pet',
          description: '',
          deprecated: undefined
        },
        {
          name: 'updatePetWithForm',
          parameters: [
            {
              type: 'number',
              name: 'petId',
              description: 'ID of pet that needs to be updated',
              required: true,
              inHeader: false,
              inBody: false,
              inQuery: false,
              inFormData: false,
              isArray: false,
              originalName: 'petId'
            },
            {
              type: 'string',
              name: 'name',
              description: 'Updated name of the pet',
              required: false,
              inHeader: false,
              inBody: false,
              inQuery: false,
              inFormData: true,
              isArray: false,
              originalName: 'name'
            },
            {
              type: 'string',
              name: 'status',
              description: 'Updated status of the pet',
              required: false,
              inHeader: false,
              inBody: false,
              inQuery: false,
              inFormData: true,
              isArray: false,
              originalName: 'status'
            }
          ],
          method: 'post',
          url: '/pet/${petId}',
          contentType: 'application/x-www-form-urlencoded',
          hasQueryParams: false,
          hasFormData: true,
          response: {
            type: 'void',
            reference: undefined,
            description: undefined,
            isArray: false
          },
          security: {
            apiKeys: [],
            tokens: [
              'petstore_auth'
            ]
          },
          summary: 'Updates a pet in the store with form data',
          description: '',
          deprecated: undefined
        },
        {
          name: 'uploadFile',
          parameters: [
            {
              type: 'number',
              name: 'petId',
              description: 'ID of pet to update',
              required: true,
              inHeader: false,
              inBody: false,
              inQuery: false,
              inFormData: false,
              isArray: false,
              originalName: 'petId'
            },
            {
              type: 'string',
              name: 'additionalMetadata',
              description: 'Additional data to pass to server',
              required: false,
              inHeader: false,
              inBody: false,
              inQuery: false,
              inFormData: true,
              isArray: false,
              originalName: 'additionalMetadata'
            },
            {
              type: 'Blob',
              name: 'file',
              description: 'file to upload',
              required: false,
              inHeader: false,
              inBody: false,
              inQuery: false,
              inFormData: true,
              isArray: false,
              originalName: 'file'
            }
          ],
          method: 'post',
          url: '/pet/${petId}/uploadImage',
          contentType: 'multipart/form-data',
          hasQueryParams: false,
          hasFormData: true,
          response: {
            type: 'ApiResponse',
            reference: undefined,
            description: 'successful operation',
            isArray: false
          },
          security: {
            apiKeys: [],
            tokens: [
              'petstore_auth'
            ]
          },
          summary: 'uploads an image',
          description: '',
          deprecated: undefined
        }
      ],
      references: {
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
            template: 'enum',
            name: 'PetFindPetsByStatus',
            file: 'pet-find-pets-by-status.enum',
            description: undefined,
            isArray: false
          }
        ]
      },
      importHttpParams: true,
      template: 'service'
    },
    {
      name: 'StoreService',
      description: 'Access to Petstore orders',
      config: {
        baseUrl: '/',
        apiKeys: false,
        accessTokens: false,
        name: 'ConfigService',
        file: 'config.service',
        template: 'config'
      },
      file: 'store.service',
      operations: [
        {
          name: 'deleteOrder',
          parameters: [
            {
              type: 'number',
              name: 'orderId',
              description: 'ID of the order that needs to be deleted',
              required: true,
              inHeader: false,
              inBody: false,
              inQuery: false,
              inFormData: false,
              isArray: false,
              originalName: 'orderId'
            }
          ],
          method: 'delete',
          url: '/store/order/${orderId}',
          contentType: 'application/json',
          hasQueryParams: false,
          hasFormData: false,
          response: {
            type: 'void',
            reference: undefined,
            description: undefined,
            isArray: false
          },
          security: {
            apiKeys: [],
            tokens: []
          },
          summary: 'Delete purchase order by ID',
          description: 'For valid response try integer IDs with positive integer value. ' +
            'Negative or non-integer values will generate API errors',
          deprecated: undefined
        },
        {
          name: 'getInventory',
          parameters: [],
          method: 'get',
          url: '/store/inventory',
          contentType: 'application/json',
          hasQueryParams: false,
          hasFormData: false,
          response: {
            type: 'object',
            reference: undefined,
            description: 'successful operation',
            isArray: false
          },
          security: {
            apiKeys: [
              {
                name: 'api_key',
                inHeader: true
              }
            ],
            tokens: []
          },
          summary: 'Returns pet inventories by status',
          description: 'Returns a map of status codes to quantities',
          deprecated: undefined
        },
        {
          name: 'getOrderById',
          parameters: [
            {
              type: 'number',
              name: 'orderId',
              description: 'ID of pet that needs to be fetched',
              required: true,
              inHeader: false,
              inBody: false,
              inQuery: false,
              inFormData: false,
              isArray: false,
              originalName: 'orderId'
            }
          ],
          method: 'get',
          url: '/store/order/${orderId}',
          contentType: 'application/json',
          hasQueryParams: false,
          hasFormData: false,
          response: {
            type: 'Order',
            reference: undefined,
            description: 'successful operation',
            isArray: false
          },
          security: {
            apiKeys: [],
            tokens: []
          },
          summary: 'Find purchase order by ID',
          description: 'For valid response try integer IDs with value >= 1 and <= 10. ' +
            'Other values will generated exceptions',
          deprecated: undefined
        },
        {
          name: 'placeOrder',
          parameters: [
            {
              type: 'Order',
              name: 'body',
              description: 'order placed for purchasing the pet',
              required: true,
              inHeader: false,
              inBody: true,
              inQuery: false,
              inFormData: false,
              isArray: false,
              originalName: 'body'
            }
          ],
          method: 'post',
          url: '/store/order',
          contentType: 'application/json',
          hasQueryParams: false,
          hasFormData: false,
          response: {
            type: 'Order',
            reference: undefined,
            description: 'successful operation',
            isArray: false
          },
          security: {
            apiKeys: [],
            tokens: []
          },
          summary: 'Place an order for a pet',
          description: '',
          deprecated: undefined
        }
      ],
      references: {},
      importHttpParams: false,
      template: 'service'
    },
    {
      name: 'UserService',
      description: 'Operations about user',
      externalDocs: {
        description: 'Find out more about our store',
        url: 'http://swagger.io'
      },
      config: {
        baseUrl: '/',
        apiKeys: false,
        accessTokens: false,
        name: 'ConfigService',
        file: 'config.service',
        template: 'config'
      },
      file: 'user.service',
      operations: [
        {
          name: 'createUser',
          parameters: [
            {
              type: 'User',
              name: 'body',
              description: 'Created user object',
              required: true,
              inHeader: false,
              inBody: true,
              inQuery: false,
              inFormData: false,
              isArray: false,
              originalName: 'body'
            }
          ],
          method: 'post',
          url: '/user',
          contentType: 'application/json',
          hasQueryParams: false,
          hasFormData: false,
          response: {
            type: 'void',
            reference: undefined,
            description: undefined,
            isArray: false
          },
          security: {
            apiKeys: [],
            tokens: []
          },
          summary: 'Create user',
          description: 'This can only be done by the logged in user.',
          deprecated: undefined
        },
        {
          name: 'createUsersWithArrayInput',
          parameters: [
            {
              type: 'User',
              name: 'body',
              description: 'List of user object',
              required: true,
              inHeader: false,
              inBody: true,
              inQuery: false,
              inFormData: false,
              isArray: true,
              originalName: 'body'
            }
          ],
          method: 'post',
          url: '/user/createWithArray',
          contentType: 'application/json',
          hasQueryParams: false,
          hasFormData: false,
          response: {
            type: 'void',
            reference: undefined,
            description: undefined,
            isArray: false
          },
          security: {
            apiKeys: [],
            tokens: []
          },
          summary: 'Creates list of users with given input array',
          description: '',
          deprecated: undefined
        },
        {
          name: 'createUsersWithListInput',
          parameters: [
            {
              type: 'User',
              name: 'body',
              description: 'List of user object',
              required: true,
              inHeader: false,
              inBody: true,
              inQuery: false,
              inFormData: false,
              isArray: true,
              originalName: 'body'
            }
          ],
          method: 'post',
          url: '/user/createWithList',
          contentType: 'application/json',
          hasQueryParams: false,
          hasFormData: false,
          response: {
            type: 'void',
            reference: undefined,
            description: undefined,
            isArray: false
          },
          security: {
            apiKeys: [],
            tokens: []
          },
          summary: 'Creates list of users with given input array',
          description: '',
          deprecated: undefined
        },
        {
          name: 'deleteUser',
          parameters: [
            {
              type: 'string',
              name: 'username',
              description: 'The name that needs to be deleted',
              required: true,
              inHeader: false,
              inBody: false,
              inQuery: false,
              inFormData: false,
              isArray: false,
              originalName: 'username'
            }
          ],
          method: 'delete',
          url: '/user/${username}',
          contentType: 'application/json',
          hasQueryParams: false,
          hasFormData: false,
          response: {
            type: 'void',
            reference: undefined,
            description: undefined,
            isArray: false
          },
          security: {
            apiKeys: [],
            tokens: []
          },
          summary: 'Delete user',
          description: 'This can only be done by the logged in user.',
          deprecated: undefined
        },
        {
          name: 'getUserByName',
          parameters: [
            {
              type: 'string',
              name: 'username',
              description: 'The name that needs to be fetched. Use user1 for testing. ',
              required: true,
              inHeader: false,
              inBody: false,
              inQuery: false,
              inFormData: false,
              isArray: false,
              originalName: 'username'
            }
          ],
          method: 'get',
          url: '/user/${username}',
          contentType: 'application/json',
          hasQueryParams: false,
          hasFormData: false,
          response: {
            type: 'User',
            reference: undefined,
            description: 'successful operation',
            isArray: false
          },
          security: {
            apiKeys: [],
            tokens: []
          },
          summary: 'Get user by user name',
          description: '',
          deprecated: undefined
        },
        {
          name: 'loginUser',
          parameters: [
            {
              type: 'string',
              name: 'username',
              description: 'The user name for login',
              required: true,
              inHeader: false,
              inBody: false,
              inQuery: true,
              inFormData: false,
              isArray: false,
              originalName: 'username'
            },
            {
              type: 'string',
              name: 'password',
              description: 'The password for login in clear text',
              required: true,
              inHeader: false,
              inBody: false,
              inQuery: true,
              inFormData: false,
              isArray: false,
              originalName: 'password'
            }
          ],
          method: 'get',
          url: '/user/login',
          contentType: 'application/json',
          hasQueryParams: true,
          hasFormData: false,
          response: {
            type: 'string',
            reference: undefined,
            description: 'successful operation',
            isArray: false
          },
          security: {
            apiKeys: [],
            tokens: []
          },
          summary: 'Logs user into the system',
          description: '',
          deprecated: undefined
        },
        {
          name: 'logoutUser',
          parameters: [],
          method: 'get',
          url: '/user/logout',
          contentType: 'application/json',
          hasQueryParams: false,
          hasFormData: false,
          response: {
            type: 'void',
            reference: undefined,
            description: undefined,
            isArray: false
          },
          security: {
            apiKeys: [],
            tokens: []
          },
          summary: 'Logs out current logged in user session',
          description: '',
          deprecated: undefined
        },
        {
          name: 'updateUser',
          parameters: [
            {
              type: 'string',
              name: 'username',
              description: 'name that need to be updated',
              required: true,
              inHeader: false,
              inBody: false,
              inQuery: false,
              inFormData: false,
              isArray: false,
              originalName: 'username'
            },
            {
              type: 'User',
              name: 'body',
              description: 'Updated user object',
              required: true,
              inHeader: false,
              inBody: true,
              inQuery: false,
              inFormData: false,
              isArray: false,
              originalName: 'body'
            }
          ],
          method: 'put',
          url: '/user/${username}',
          contentType: 'application/json',
          hasQueryParams: false,
          hasFormData: false,
          response: {
            type: 'void',
            description: undefined,
            isArray: false
          },
          security: {
            apiKeys: [],
            tokens: []
          },
          summary: 'Updated user',
          description: 'This can only be done by the logged in user.',
          deprecated: undefined
        }
      ],
      references: {},
      importHttpParams: true,
      template: 'service'
    }
  ];

  it('fetch all services', () => {
    expect(fetchServices(spec, config)).toEqual(services);
  });

});
