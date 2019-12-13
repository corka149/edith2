import { UserGroup } from './user-group';

export class Invitation {

    constructor(
        public id: number,
        public inviteeName: string,
        public groupId: number,
    ) {}

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
