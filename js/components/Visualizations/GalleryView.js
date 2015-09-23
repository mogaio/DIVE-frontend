import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchSpecsIfNeeded } from '../../actions/VisualizationActions';
import styles from './visualizations.sass';

export class GalleryView extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { specSelector, project } = this.props;

    if (specSelector.datasetId) {
      this.props.fetchSpecsIfNeeded(project.properties.id, specSelector.datasetId);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { specSelector, project } = this.props;
    if (specSelector.datasetId !== nextProps.specSelector.datasetId) {
      this.props.fetchSpecsIfNeeded(project.properties.id, nextProps.specSelector.datasetId);
    }

  }

  render() {
    return (
      <div>
        { this.props.specs.items.map((spec) =>
          <div>{ spec.meta.desc }</div>
        )}
      </div>
    );
  }
}

GalleryView.propTypes = {
  project: PropTypes.object.isRequired,
  specs: PropTypes.object.isRequired,
  specSelector: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const { project, specs, specSelector } = state;
  return {
    project,
    specs,
    specSelector
  }
}

export default connect(mapStateToProps, { fetchSpecsIfNeeded })(GalleryView);