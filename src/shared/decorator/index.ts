import { SetMetadata } from '@nestjs/common';

export const Roles = (...roles: number[]) => SetMetadata('roles', roles);

/**
 * @param {boolean} value
 * Accept for API Public without Token
 */
export const IsPublic = (value = true) => SetMetadata('IS_PUBLIC', value);
