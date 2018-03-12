import { connect } from 'react-redux';
import { saveAs } from 'file-saver';

import { Button } from '@clickr/common/lib/components';
import { console } from '@clickr/common/lib/util';
import { getName } from '@clickr/common/lib/device-name';
import { getQuestionListState as questionList, getAnsweredCount, getAnsweredVector }
  from '@clickr/common/lib/questions';
import { getDevices } from '@clickr/common/lib/devices';
import { getOffset } from '@clickr/common/lib/offset';

const mapStateToProps = state => ({
  onClick: () => {
    const questions = questionList(state);
    const deviceKeys = getDevices(state, /* onlyShown */ true).map(d => d.deviceKey);
    const rows = [`Name,Points (total + offset),Total Answered,Offset,${
      questions.map(q => q.title).join(',')}`];

    deviceKeys.forEach((deviceKey) => {
      const name = getName(state, deviceKey);
      const offset = getOffset(state, deviceKey);
      const answered = getAnsweredVector(state, deviceKey);
      const answeredC = getAnsweredCount(state, deviceKey);
      const points = answeredC + offset;
      rows.push(`${name},${points},${answeredC},${offset},${answered.join(',')}`);
    });

    const content = rows.join('\n');

    try {
      const file = new File(
        [content],
        `${state.className}.csv`,
        { type: 'text/csv' },
      );
      saveAs(file);
    } catch (error) {
      // eslint-disable-next-line no-alert
      alert('Error saving file.');
      console.error(error);
    }
  },
  label: 'Export Results',
  faIcon: 'save',
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Button);
