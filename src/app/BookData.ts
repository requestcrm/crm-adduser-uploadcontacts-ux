import { InMemoryDbService } from 'angular-in-memory-web-api';

export class BookData implements InMemoryDbService {
  createDb() {
    let books = [
      { name: 'Core Java',
       address : "asd",
      email : "mohan@gmail.com",
      mobile : "1234567890" }
    ];
    return {books};
  }
} 