import { connect } from 'react-redux'
import Button from '../components/Button'
import { saveAs } from 'file-saver'
import console from '../util/console'
import { getName } from '../device-name/DeviceNameC'
import { getState as questionList } from '../questions/question-list'
import { getDevices } from '../devices/device-list'

const mapStateToProps = (state) => ({
  onClick: () => {
    let questions = questionList(state)
    let deviceKeys = getDevices(state).map(d => d.deviceKey)
    let rows = ['Name,Total Answered,' + questions.map(q => q.title).join(',')]
    for (let deviceKey of deviceKeys) {
      let name = getName(state, deviceKey)
      let answered = questions.map(q =>
        q.answeredBy.indexOf(deviceKey) !== -1 ? 1 : 0)
      let total = answered.reduce((sum, cur) => sum + cur, 0)
      rows.push(`${name},${total},${answered.join(',')}`)
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