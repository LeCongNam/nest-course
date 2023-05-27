import { Body, Controller, Get, Post } from '@nestjs/common';
import axios from 'axios';

@Controller('gg-form')
export class GoogleFormController {
  @Post()
  async name(@Body() data: any) {
    try {
      console.log(data);
      const tele = await axios.post(
        `https://api.telegram.org/bot6103587113:AAGjDJotIRaAltlSudtcw5IwMxuUgliPEws/sendMessage?chat_id=5500711096&text=${JSON.stringify(
          data,
        )}`,
      );
      console.log(tele);

      return tele;
    } catch (error) {
      console.log(error);
    }
  }
}
