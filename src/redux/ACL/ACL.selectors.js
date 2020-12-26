import { createSelector } from 'reselect'

export const selectACL = state => state['ACL'];

export const selectRole = createSelector(selectACL, acl => acl.role);
export const selectPermissions = createSelector(selectACL, acl => acl.selectPermissions);