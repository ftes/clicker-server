import { connect } from 'react-redux'

import Button from '../components/button'
import { saveAs } from 'file-saver'
import console from '../common/console'
import { getName } from '../device-name/device-name'
import { getState as questionList, getAnsweredCount, getAnsweredVector }
  from '../questions/question-list'
import { getDevices } from '../devices/device-list'
import { getOffset } from '../offset'

const mapStateToProps = (state) => ({
  onClick: () => {
    let questions = questionList(state)
    let deviceKeys = getDevices(state, /*onlyShown*/ true).map(d => d.deviceKey)
    let rows = ['Name,Points (total + offset),Total Answered,Offset,'
      + questions.map(q => q.title).join(',')]
    for (let deviceKey of deviceKeys) {
      let name = getName(state, deviceKey)
      let offset = getOffset(state, deviceKey)
      let answered = getAnsweredVector(state, deviceKey)
      let answeredC = getAnsweredCount(state, deviceKey)
      let points = answeredC + offset
      rows.push(`${name},${points},${answeredC},${offset},${answered.join(',')}`)
    }
    let content = rows.join('\n')

    try {
      let file = new File(
        [content],
        state.className + '.csv',
        { type: 'text/csv' }
      )
      saveAs(file)
    } catch (error) {
      alert('Error saving file.')
      console.error(error)
    }
  },
  label: 'Export Results',
  faIcon: 'save',
})

const mapDispatchToProps = () => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Button)