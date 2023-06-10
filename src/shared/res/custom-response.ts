import { Response } from 'express';

export class BaseController {
  public customResponse(
    res: Response,
    data: any,
    option?: {
      code?: number;
      message?: string;
      success?: boolean;
      total?: number;
      page?: number;
    },
  ) {
    return res.status(option?.code || 200).send({
      data: data,
      pagination:
        (option && { ...option, page: option?.page + 1 }) || undefined,
    });
  }
}
