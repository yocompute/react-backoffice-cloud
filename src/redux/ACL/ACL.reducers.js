import { SET_ACL } from './ACL.actions'

export const ACLReducer = (state = {}, action) => {
    switch(action.type){
        case SET_ACL:
            return {
                ...state,
                userId: action.userId,
                role: action.role,
                permissions: action.permissions
            }
        default:
            return state;
    }
}

