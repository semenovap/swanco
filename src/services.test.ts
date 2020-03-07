import orderBy = require('lodash.orderby');
import {resolve} from 'path';
import {Spec} from 'swagger-schema-official';
import {Config} from './config';
import {Enum} from './enums';
import {
  fetchServices,
  Service
} from './services';
import {getData} from './utils';

describe('services', () => {

  let source: Spec;

  let spec: Spec;
  let config: Config;
  let enumFindPetsByStatus: Enum;
  let petService: Service;
  let storeService: Service;
  let userService: Service;
  let defaultService: Service;
  let services: Service[];
  let singleService: Service[];

  beforeAll(async () => source = await getData(resolve(__dirname, '../fixture.test.json')));

  beforeEach(() => {
    spec = JSON.parse(JSON.stringify(source));

    config = {
      baseUrl: '/',
      apiKeys: false,
      accessTokens: false,
      name: 'ConfigService',
      file: 'config.service',
      template: 'config'
    };

    enumFindPetsByStatus = {
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
    };

    petService = {
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
          generics: [],
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
              reference: undefined,
              originalName: 'body'
            }
          ],
          method: 'post',
          url: '/pet',
          accept: 'application/json',
          contentType: 'application/json',
          hasQueryParams: false,
          hasFormData: false,
          hasNoBody: false,
          response: {
            type: 'void',
            reference: undefined,
            description: undefined,
            isArray: false
          },
          security: {
            apiKeys: [],
            tokens: [
              {
                name: 'petstore_auth',
                type: 'Bearer'
              }
            ]
          },
          summary: 'Add a new pet to the store',
          description: '',
          deprecated: undefined
        },
        {
          name: 'deletePet',
          generics: [],
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
              reference: undefined,
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
              reference: undefined,
              originalName: 'api_key'
            }
          ],
          method: 'delete',
          url: '/pet/${petId}',
          accept: 'application/json',
          contentType: undefined,
          hasQueryParams: false,
          hasFormData: false,
          hasNoBody: false,
          response: {
            type: 'void',
            reference: undefined,
            description: undefined,
            isArray: false
          },
          security: {
            apiKeys: [],
            tokens: [
              {
                name: 'petstore_auth',
                type: 'Bearer'
              }
            ]
          },
          summary: 'Deletes a pet',
          description: '',
          deprecated: undefined
        },
        {
          name: 'findPetsByStatus',
          generics: [],
          parameters: [
            {
              type: 'PetFindPetsByStatus',
              reference: enumFindPetsByStatus,
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
          accept: 'application/json',
          contentType: undefined,
          hasQueryParams: true,
          hasFormData: false,
          hasNoBody: false,
          response: {
            type: 'Pet',
            reference: undefined,
            description: 'successful operation',
            isArray: true
          },
          security: {
            apiKeys: [],
            tokens: [
              {
                name: 'petstore_auth',
                type: 'Bearer'
              }
            ]
          },
          summary: 'Finds Pets by status',
          description: 'Multiple status values can be provided with comma separated strings',
          deprecated: undefined
        },
        {
          name: 'findPetsByTags',
          generics: [],
          parameters: [
            {
              type: 'string',
              name: 'tags',
              description: 'Tags to filter by',
              required: true,
              inHeader: false,
              inBody: false,
              inQuery: true,
              inFormData: false,
              isArray: true,
              reference: undefined,
              originalName: 'tags'
            }
          ],
          method: 'get',
          url: '/pet/findByTags',
          accept: 'application/json',
          contentType: undefined,
          hasQueryParams: true,
          hasFormData: false,
          hasNoBody: false,
          response: {
            type: 'Pet',
            reference: undefined,
            description: 'successful operation',
            isArray: true
          },
          security: {
            apiKeys: [],
            tokens: [
              {
                name: 'petstore_auth',
                type: 'Bearer'
              }
            ]
          },
          summary: 'Finds Pets by tags',
          description: 'Multiple tags can be provided with comma separated strings. Use tag1, tag2, tag3 for testing.',
          deprecated: true
        },
        {
          name: 'getPetById',
          generics: [],
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
              reference: undefined,
              originalName: 'petId'
            }
          ],
          method: 'get',
          url: '/pet/${petId}',
          accept: 'application/json',
          contentType: undefined,
          hasQueryParams: false,
          hasFormData: false,
          hasNoBody: false,
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
          generics: [],
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
              reference: undefined,
              originalName: 'body'
            }
          ],
          method: 'put',
          url: '/pet',
          accept: 'application/json',
          contentType: 'application/json',
          hasQueryParams: false,
          hasFormData: false,
          hasNoBody: false,
          response: {
            type: 'void',
            reference: undefined,
            description: undefined,
            isArray: false
          },
          security: {
            apiKeys: [],
            tokens: [
              {
                name: 'petstore_auth',
                type: 'Bearer'
              }
            ]
          },
          summary: 'Update an existing pet',
          description: '',
          deprecated: undefined
        },
        {
          name: 'updatePetWithForm',
          generics: [],
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
              reference: undefined,
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
              reference: undefined,
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
              reference: undefined,
              originalName: 'status'
            }
          ],
          method: 'post',
          url: '/pet/${petId}',
          accept: 'application/json',
          contentType: undefined,
          hasQueryParams: false,
          hasFormData: true,
          hasNoBody: false,
          response: {
            type: 'void',
            reference: undefined,
            description: undefined,
            isArray: false
          },
          security: {
            apiKeys: [],
            tokens: [
              {
                name: 'petstore_auth',
                type: 'Bearer'
              }
            ]
          },
          summary: 'Updates a pet in the store with form data',
          description: '',
          deprecated: undefined
        },
        {
          name: 'uploadFile',
          generics: [],
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
              reference: undefined,
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
              reference: undefined,
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
              reference: undefined,
              originalName: 'file'
            }
          ],
          method: 'post',
          url: '/pet/${petId}/uploadImage',
          accept: 'application/json',
          contentType: undefined,
          hasQueryParams: false,
          hasFormData: true,
          hasNoBody: false,
          response: {
            type: 'ApiResponse',
            reference: undefined,
            description: 'successful operation',
            isArray: false
          },
          security: {
            apiKeys: [],
            tokens: [
              {
                name: 'petstore_auth',
                type: 'Bearer'
              }
            ]
          },
          summary: 'uploads an image',
          description: '',
          deprecated: undefined
        }
      ],
      references: {
        enum: [
          enumFindPetsByStatus
        ]
      },
      importHttpParams: true,
      template: 'service'
    };

    storeService = {
      name: 'StoreService',
      description: 'Access to Petstore orders',
      config,
      file: 'store.service',
      operations: [
        {
          name: 'deleteOrder',
          generics: [],
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
              reference: undefined,
              originalName: 'orderId'
            }
          ],
          method: 'delete',
          url: '/store/order/${orderId}',
          accept: 'application/json',
          contentType: undefined,
          hasQueryParams: false,
          hasFormData: false,
          hasNoBody: false,
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
          generics: [],
          parameters: [],
          method: 'get',
          url: '/store/inventory',
          accept: 'application/json',
          contentType: undefined,
          hasQueryParams: false,
          hasFormData: false,
          hasNoBody: false,
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
          generics: [],
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
              reference: undefined,
              originalName: 'orderId'
            }
          ],
          method: 'get',
          url: '/store/order/${orderId}',
          accept: 'application/json',
          contentType: undefined,
          hasQueryParams: false,
          hasFormData: false,
          hasNoBody: false,
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
          generics: [],
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
              reference: undefined,
              originalName: 'body'
            }
          ],
          method: 'post',
          url: '/store/order',
          accept: 'application/json',
          contentType: undefined,
          hasQueryParams: false,
          hasFormData: false,
          hasNoBody: false,
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
    };

    userService = {
      name: 'UserService',
      description: 'Operations about user',
      externalDocs: {
        description: 'Find out more about our store',
        url: 'http://swagger.io'
      },
      config,
      file: 'user.service',
      operations: [
        {
          name: 'createUser',
          generics: [],
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
              reference: undefined,
              originalName: 'body'
            }
          ],
          method: 'post',
          url: '/user',
          accept: 'application/json',
          contentType: undefined,
          hasQueryParams: false,
          hasFormData: false,
          hasNoBody: false,
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
          generics: [],
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
              reference: undefined,
              originalName: 'body'
            }
          ],
          method: 'post',
          url: '/user/createWithArray',
          accept: 'application/json',
          contentType: undefined,
          hasQueryParams: false,
          hasFormData: false,
          hasNoBody: false,
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
          generics: [],
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
              reference: undefined,
              originalName: 'body'
            }
          ],
          method: 'post',
          url: '/user/createWithList',
          accept: 'application/json',
          contentType: undefined,
          hasQueryParams: false,
          hasFormData: false,
          hasNoBody: false,
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
          generics: [],
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
              reference: undefined,
              originalName: 'username'
            }
          ],
          method: 'delete',
          url: '/user/${username}',
          accept: 'application/json',
          contentType: undefined,
          hasQueryParams: false,
          hasFormData: false,
          hasNoBody: false,
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
          generics: [],
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
              reference: undefined,
              originalName: 'username'
            }
          ],
          method: 'get',
          url: '/user/${username}',
          accept: 'application/json',
          contentType: undefined,
          hasQueryParams: false,
          hasFormData: false,
          hasNoBody: false,
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
          generics: [],
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
              reference: undefined,
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
              reference: undefined,
              originalName: 'password'
            }
          ],
          method: 'get',
          url: '/user/login',
          accept: 'application/json',
          contentType: undefined,
          hasQueryParams: true,
          hasFormData: false,
          hasNoBody: false,
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
          generics: [],
          parameters: [],
          method: 'get',
          url: '/user/logout',
          accept: 'application/json',
          contentType: undefined,
          hasQueryParams: false,
          hasFormData: false,
          hasNoBody: false,
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
          generics: [],
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
              reference: undefined,
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
              reference: undefined,
              originalName: 'body'
            }
          ],
          method: 'put',
          url: '/user/${username}',
          accept: 'application/json',
          contentType: undefined,
          hasQueryParams: false,
          hasFormData: false,
          hasNoBody: false,
          response: {
            type: 'void',
            description: undefined,
            reference: undefined,
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
    };

    defaultService = {
      config,
      operations: [],
      description: 'Api service',
      file: 'api.service',
      importHttpParams: true,
      name: 'ApiService',
      references: {},
      template: 'service'
    };

    services = [petService, storeService, userService];

    singleService = [
      {
        config,
        ...defaultService,
        operations: orderBy(services.reduce((all, current) => all.concat(current.operations), []), 'name'),
        references: {
          enum: [
            enumFindPetsByStatus
          ]
        }
      }
    ];
  });

  it('fetch all services', () => {
    expect(fetchServices(spec, config)).toEqual(services);
  });

  it('generate only one API service', () => {
    delete spec.tags;
    expect(fetchServices(spec, config)).toEqual(singleService);
  });

  it('generate services without security definitions', () => {
    delete spec.securityDefinitions;
    services.forEach(service => service.operations.forEach(operation => {
      if (operation.security.apiKeys.length) {
        operation.security.apiKeys.forEach(key => operation.security.tokens.push({
          name: key.name,
          type: 'Bearer'
        }));
        operation.security.apiKeys = [];
      }
    }));
    expect(fetchServices(spec, config)).toEqual(services);
  });

  it('extract enums from parameters and responses', () => {
    const pathName = Object.keys(spec.paths)[0];
    const operators = spec.paths[pathName];
    const methods = Object.keys(operators);
    const firstIn = operators[methods[0]];
    const secondIn = operators[methods[1]];
    firstIn.parameters[0].type = 'string';
    firstIn.parameters[0].enum = ['available', 'pending', 'sold'];
    firstIn.responses = {
      200: {
        schema: {
          type: 'string',
          enum: ['available', 'pending', 'sold']
        }
      }
    };
    delete firstIn.parameters[0].schema;
    secondIn.responses = {
      default: {
        schema: {
          type: 'string',
          items: {
            enum: ['available', 'pending', 'sold']
          }
        }
      }
    };

    const firstOut = petService.operations.find(operation => operation.name === firstIn.operationId);
    const secondOut = petService.operations.find(operation => operation.name === secondIn.operationId);
    firstOut.parameters[0].type = enumFindPetsByStatus.name;
    firstOut.parameters[0].reference = enumFindPetsByStatus;
    firstOut.response.type = enumFindPetsByStatus.name;
    firstOut.response.reference = enumFindPetsByStatus;
    secondOut.response.type = enumFindPetsByStatus.name;
    secondOut.response.reference = enumFindPetsByStatus;

    expect(fetchServices(spec, config)).toEqual(services);
  });

  it('extract references from parameters and responses', () => {
    const operators = spec.paths[Object.keys(spec.paths)[0]];
    const methods = Object.keys(operators);
    const operator = operators[methods[0]];
    operator.parameters.push(
      {
        $ref: '#/definitions/User'
      },
      {
        name: 'foo',
        schema: {}
      }
    );
    operator.responses = {
      200: {
        $ref: '#/definitions/User'
      }
    };

    const operation = petService.operations.find(o => o.name === operator.operationId);
    operation.parameters.unshift({
      description: undefined,
      inBody: false,
      inFormData: false,
      inHeader: false,
      inQuery: false,
      isArray: false,
      name: 'foo',
      originalName: 'foo',
      reference: undefined,
      required: undefined,
      type: 'any'
    });
    operation.parameters.push({
      type: 'User',
      name: 'User',
      description: '',
      reference: undefined,
      required: true,
      isArray: false,
      inBody: true
    });
    operation.response.type = 'User';

    expect(fetchServices(spec, config)).toEqual(services);
  });

  it('generate default API service', () => {
    const pathName = Object.keys(spec.paths)[0];
    const operators = spec.paths[pathName];
    const operator = operators[Object.keys(operators)[0]];
    delete operator.tags;
    delete operator.parameters;
    delete operator.summary;
    operator.produces = ['application/xml'];

    const operation = petService.operations.splice(0, 1)[0];
    operation.parameters = [];
    operation.hasNoBody = true;
    operation.accept = 'application/xml';
    operation.summary = operation.name;
    defaultService.operations.push(operation);
    defaultService.importHttpParams = false;

    expect(fetchServices(spec, config)).toEqual([defaultService, ...services]);
  });

});
