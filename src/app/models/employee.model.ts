import { Address } from './address.model';

// {
//     "id": 1,
//     "name": "John Doe",
//     "address": {
//         "id": 1,
//         "name": "Home Address"
//     }
// }
export interface Employee {
  id: number;
  name: string;
  address: Address;
}
