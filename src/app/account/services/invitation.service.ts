import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Invitation, Memberships } from '../models/invitation';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvitationService {

  private static INVITATION = '/jarvis/v1/accounts/invitations';

  constructor(
    private httpClient: HttpClient
  ) { }

  /**
   * invite an user to a group
   */
  public inviteUser(invitation: Invitation): Observable<any> {
    return this.httpClient.post(InvitationService.INVITATION,
      { invitation:
        { invitee_name: invitation.inviteeName, usergroup_id: invitation.groupId }
      });
  }

  /**
   * deleteInvitation
   */
  public deleteInvitation(invitation: Invitation): Observable<any> {
    return this.httpClient.delete(InvitationService.INVITATION + `/${invitation.groupId}`);
  }

  /**
   * acceptInvitation
   */
  public acceptInvitation(invitation: Invitation): Observable<any> {
    return this.httpClient.get(InvitationService.INVITATION + `/${invitation.groupId}/accept`);
  }

  /**
   * listMemberships
   */
  public listMemberships(): Observable<Memberships> {
    return this.httpClient.get<Memberships>(InvitationService.INVITATION);
  }
}
