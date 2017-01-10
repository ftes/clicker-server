import { connect } from 'react-redux'
import Button from '../components/Button'
import { saveAs } from 'file-saver'
import console from '../util/console'
import { getName } from '../device-name/DeviceNameC'
import { getState as questionList, getAnsweredCount, getAnswered }
  from '../questions/question-list'
import { getDevices } from '../devices/device-list'
import { getOffset } from '../offset'

const mapStateToProps = (state) => ({
  onClick: () => {
    let questions = questionList(state)
    let deviceKeys = getDevices(state).map(d => d.deviceKey)
    let rows = ['Name,Points (total + offset),Total Answered,Offset,'
      + questions.map(q => q.title).join(',')]
    for (let deviceKey of deviceKeys) {
      let name = getName(state, deviceKey)
      let offset = getOffset(state, deviceKey)
      let answered = getAnswered(state, deviceKey)
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

const SaveC = connect(mapStateToProps, mapDispatchToProps)(Button)

export default SaveC