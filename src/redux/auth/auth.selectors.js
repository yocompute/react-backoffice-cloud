import { createSelector } from 'reselect'

export const selectAuth = state => state['auth'];

export const selectMyAuth = createSelector(selectAuth, auth => auth)