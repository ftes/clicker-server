import { createStore, applyMiddleware } from 'redux'

import reducer from './reducers'
import { reset } from '@clickr/common/lib/save'
import { initialState as showSettingsInit } from '@clickr/common/lib/show-settings'
import { press } from '@clickr/common/lib/button-press'
import { startQuestion as startQuestion, clearCountdown } from '@clickr/common/lib/questions'
import { getStateMiddleware } from '@clickr/common/lib/util'
import { storeForSyncTest } from '@clickr/common/lib/sync'

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