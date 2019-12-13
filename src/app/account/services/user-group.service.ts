import { Injectable } from '@angular/core';
import { UserGroup } from '../models/user-group';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserGroupService {

  private static USER_GROUP = '/jarvis/v1/accounts/usergroups';

  constructor(
    private httpClient: HttpClient
  ) { }

  /**
   * getUserGroups
   */
  public getUserGroups(): Observable<UserGroup[]> {
    return this.httpClient.get<UserGroup[]>(UserGroupService.USER_GROUP);
  }

  /**
   * getUserGroup
   */
  public getUserGroup(id: number): Observable<UserGroup> {
    return this.httpClient.get<UserGroup>(UserGroupService.USER_GROUP + `/${id}`);
  }

  /**
   * createUserGroup
   */
  public createUserGroup(name: string): Observable<UserGroup> {
    return this.httpClient.post<UserGroup>(UserGroupService.USER_GROUP, { user_group: { name } });
  }

  /**
   * updateUserGroup
   */
  public updateUserGroup(userGroup: UserGroup): Observable<UserGroup> {
    return this.httpClient.put<UserGroup>(UserGroupService.USER_GROUP + `/${userGroup.id}`, { user_group: { name: userGroup.name } });
  }

  /**
   * deleteUserGroup
   */
  public deleteUserGroup(userGroup: UserGroup): Observable<any> {
    return this.httpClient.delete<any>(UserGroupService.USER_GROUP + `/${userGroup.id}`);
  }

  /**
   * leaveUserGroup
   */
  public leaveUserGroup(userGroup: UserGroup): Observable<any> {
    return this.httpClient.delete<any>(UserGroupService.USER_GROUP + `/${userGroup.id}/leave`);
  }

}
