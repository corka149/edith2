import { UserGroup } from './user-group';

export class Invitation {

    constructor(
        public id: number,
        public groupId: number,
        // tslint:disable-next-line: variable-name
        private invitee_email: string,
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
