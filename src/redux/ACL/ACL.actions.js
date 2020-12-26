// action types
export const SET_ACL = 'ACL/SET_ACL';

// action creators
export const setACL = (userId, role, permissions) => ({
    type: SET_ACL,
    userId,
    role,
    permissions
})