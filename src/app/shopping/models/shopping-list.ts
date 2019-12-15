import { User } from 'src/app/account/models/user';
import { UserGroup } from 'src/app/account/models/user-group';

export class ShoppingList {

    constructor(
        public done: boolean,
        /**  Date string in format iso8601 */
        // tslint:disable-next-line: variable-name
        public planned_for: string,
        /** user group id */
        // tslint:disable-next-line: variable-name
        public belongs_to: number,
        // tslint:disable-next-line: variable-name
        public belongs_to_group?: UserGroup,
        public id?: number,
        public creator?: User,
    ) { }

}
