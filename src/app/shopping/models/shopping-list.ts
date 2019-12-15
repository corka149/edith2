import { User } from 'src/app/account/models/user';
import { UserGroup } from 'src/app/account/models/user-group';

export class ShoppingList {

    constructor(
        public id: number,
        public done: boolean,
        /**  Date string in format iso8601 */
        // tslint:disable-next-line: variable-name
        public planned_for: string,
        public belongs_to: UserGroup,
        public creator: User,
    ) { }

}
