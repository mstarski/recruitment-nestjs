import { createHmac } from 'crypto';
import { Tool } from './tool';

export class HashTool extends Tool {
  static md5(str: string) {
    return createHmac('md5', 'secret').update(str).digest('hex');
  }
}
