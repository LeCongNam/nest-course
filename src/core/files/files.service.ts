import { Injectable } from '@nestjs/common';
import { readFile } from 'fs';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';

@Injectable()
export class FilesService {
  create(createFileDto: CreateFileDto) {
    return 'This action adds a new file';
  }

  public async findAll() {
    const data = await this.readFile();
    return data;
  }

  public async readFile() {
    return new Promise((resolve, reject) => {
      readFile(process.cwd() + '/src/core/files/result.json', (err, dt) => {
        if (err) {
          reject(err);
        }
        resolve(JSON.parse(String(dt)));
      });
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} file`;
  }

  update(id: number, updateFileDto: UpdateFileDto) {
    return `This action updates a #${id} file`;
  }

  remove(id: number) {
    return `This action removes a #${id} file`;
  }
}

interface Firebase {
  type: 'increase' | 'decrease';
}
