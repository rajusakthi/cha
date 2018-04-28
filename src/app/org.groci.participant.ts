import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.groci.participant{
   export abstract class CHAParticipant extends Participant {
      participantKey: string;
      contact: Contact;
   }
   export class Contact {
      fName: string;
      lname: string;
      email: string;
   }
   export class CHANetworkAdmin extends CHAParticipant {
   }
   export class OwnerPersonnel extends CHAParticipant {
   }
   export class TenantPartner extends CHAParticipant {
   }
// }
