import { connect } from 'react-redux';
import { saveAs } from 'file-saver';
import yaml from 'js-yaml';

import { Button } from '@clickr/common/lib/components';
import { console, del } from '@clickr/common/lib/util';

import { deleteOnFileSave } from '../core/reducers';

const mapStateToProps = state => ({
  onClick: () => {
    const stateToSave = del(state, deleteOnFileSave);

    try {
      const content = yaml.dump(stateToSave);
      const file = new File(
        [content],
        `${stateToSave.className}.yaml`,
        { type: 'application/yaml' },
      );
      saveAs(file);
    } catch (error) {
      // eslint-disable-next-line no-alert
      alert('Error saving file.');
      console.error(error);
    }
  },
  label: 'Save',
  glyph: 'save',
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Button);
