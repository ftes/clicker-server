import { createStore, applyMiddleware } from 'redux'

import reducer from './reducers'
import { reset } from '../common/save'
import { initialState as showSettingsInit } from '../common/show-settings'
import { press } from '../common/button-press'
import { start as startQuestion } from '../common/questions/question'
import getStateMiddleware from '../common/util/get-state-middleware'
import { storeForSyncTest } from '../common/sync/test-util'
import { clear } from '../common/questions/countdown/index'

describe('reducer', () => {
  const getStore = (state = {}) =>
    createStore(reducer, state, applyMiddleware(getStateMiddleware))

  it('preserves sync status on reset', () => {
    const preState = { sync: true }
    const store = getStore(preState)
    store.dispatch(reset())

    const postState = store.getState()
    expect(postState.sync).toEqual(true)
  })

  it('forgets showSettings status on reset', () => {
    const preState = { showSettings: !showSettingsInit }
    const store = getStore(preState)
    store.dispatch(reset())

    const postState = store.getState()
    expect(postState.showSettings).toEqual(showSettingsInit)
  })

  it('does not sync button answeredBy during question', () => {
    const publish = jest.fn()
    const store = storeForSyncTest(publish, reducer)

    // set active question
    store.dispatch(startQuestion())

    // press button
    const publishedStatesBefore = publish.mock.calls.length
    store.dispatch(press('type', 'id', true))
    const publishedStatesAfter = publish.mock.calls.length

    // expect not to be synced
    expect(publishedStatesAfter).toEqual(publishedStatesBefore)
  })

  it('syncs answeredBy after question is finished', () => {
    const publish = jest.fn()
    const store = storeForSyncTest(publish, reducer)

    // set active question
    store.dispatch(startQuestion())

    // press button
    store.dispatch(press('type', 'id', true))

    // finish question
    store.dispatch(clear())

    const lastPublishCall = publish.mock.calls.slice(-1)[0]
    const lastPublishedState = lastPublishCall[1]

    // expect answeredBy to include type/id in last published state
    expect(lastPublishedState.questions.list[0].answeredBy[0]).toEqual('type/id')
  })
})