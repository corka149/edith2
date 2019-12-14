import { UserGroup } from './user-group';
import { User } from './user';

export class Invitation {

    constructor(
        public id: number,
        // tslint:disable-next-line: variable-name
        public invited_into: UserGroup,
        // tslint:disable-next-line: variable-name
        public invitee_email: string,
        public host: User,
    ) {}

    get inviteeEmail() {
        return this.invitee_email;
    }
}

export class Memberships {

    constructor(
        // tslint:disable-next-line: variable-name
        public received_invitations: Invitation[],
        // tslint:disable-next-line: variable-name
        public created_invitations: Invitation[],
        public memberships: UserGroup[],
    ) {}

}
