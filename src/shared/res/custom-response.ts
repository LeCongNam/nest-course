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
    console.log(data);

    return res.status(option?.code || 200).json({
      data: data,
      option: option ? option : undefined,
    });
  }
}
