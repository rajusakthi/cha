import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.groci.house{
   export class House extends Asset {
      houseId: string;
      ownershipType: Ownership;
      apt: string;
      address: string;
      city: string;
      state: string;
      zip: string;
   }
   export enum Ownership {
      RENTED,
      OWNED,
   }
   export class CreateHouse extends Transaction {
      apt: string;
      address: string;
      city: string;
      state: string;
      zip: string;
   }
   export class HouseCreated extends Event {
      houseId: string;
   }
// }
