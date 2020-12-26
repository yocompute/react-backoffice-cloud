import { createSelector } from 'reselect'

export const selectUsers = state => state['users'];

export const selectMyUsers = createSelector(selectUsers, users => 
    users.map(user => {
        name: user.name
    })
)

// export const selectUserByPhone = phone => createSelector(selectUsers, users => users.find(user => user.phone === phone));