import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { PaginatedList } from '../infra/infra.types';

// https://stackoverflow.com/a/73584763

export const ApiOkResponsePaginated = <PaginatedDataType extends Type<unknown>>(
  paginatedDataType: PaginatedDataType,
) =>
  applyDecorators(
    ApiExtraModels(PaginatedList, paginatedDataType),
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(PaginatedList) },
          {
            properties: {
              result: {
                type: 'array',
                items: { $ref: getSchemaPath(paginatedDataType) },
              },
            },
          },
        ],
      },
    }),
  );
