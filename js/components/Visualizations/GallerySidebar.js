import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { selectDataset, fetchDatasetsIfNeeded } from '../../actions/DatasetActions';
import { fetchFieldPropertiesIfNeeded, selectFieldProperty, selectAggregationFunction } from '../../actions/FieldPropertiesActions';
import { selectVisualizationType } from '../../actions/VisualizationActions';
import styles from './Visualizations.sass';

import Select from 'react-select';
import Sidebar from '../Base/Sidebar';
import SidebarGroup from '../Base/SidebarGroup';
import ToggleButtonGroup from '../Base/ToggleButtonGroup';

export class GallerySidebar extends Component {
  componentWillReceiveProps(nextProps) {
    const { project, datasets, datasetSelector, fieldProperties, fetchDatasetsIfNeeded, fetchFieldPropertiesIfNeeded, selectDataset } = this.props;

    const projectChanged = (nextProps.project.properties.id !== project.properties.id);
    const datasetChanged = (nextProps.datasetSelector.datasetId !== datasetSelector.datasetId);

    if (projectChanged || (nextProps.project.properties.id && !datasetSelector.datasetId)) {
      fetchDatasetsIfNeeded(nextProps.project.properties.id);
    }
    if (datasetChanged) {
      fetchFieldPropertiesIfNeeded(project.properties.id, nextProps.datasetSelector.datasetId)
    }
  }

  render() {
    const menuItems = this.props.datasets.items.map((dataset, i) =>
      new Object({
        value: dataset.datasetId,
        label: dataset.title
      })
    );

    return (
      <Sidebar>
        { this.props.datasets.items && this.props.datasets.items.length > 0 &&
          <SidebarGroup heading="Dataset">
            <Select
              value={ `${this.props.datasetSelector.datasetId}` }
              options={ menuItems }
              onChange={ this.props.selectDataset }
              multi={ false }
              clearable={ false }
              searchable={ false } />
          </SidebarGroup>
        }
        { this.props.datasets.items && this.props.datasets.items.length > 0 &&
          <SidebarGroup heading="Visualization type">
            <ToggleButtonGroup
              toggleItems={ this.props.filters.visualizationTypes }
              displayTextMember="label"
              valueMember="type"
              imageNameMember="imageName"
              imageNameSuffix=".chart.svg"
              onChange={ this.props.selectVisualizationType } />
          </SidebarGroup>
        }
        { this.props.fieldProperties.items.length > 0 &&
          <SidebarGroup heading="Fields">
            <ToggleButtonGroup
              toggleItems={ this.props.fieldProperties.items }
              displayTextMember="name"
              valueMember="id"
              selectMenuItem={ this.props.selectAggregationFunction }
              onChange={ this.props.selectFieldProperty } />
          </SidebarGroup>
        }
      </Sidebar>
    );
  }
}

GallerySidebar.propTypes = {
  project: PropTypes.object.isRequired,
  datasets: PropTypes.object.isRequired,
  datasetSelector: PropTypes.object.isRequired,
  fieldProperties: PropTypes.object.isRequired,
  filters: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const { project, datasets, datasetSelector, fieldProperties, filters } = state;
  return {
    project,
    datasets,
    datasetSelector,
    fieldProperties,
    filters
  };
}

export default connect(mapStateToProps, {
  fetchDatasetsIfNeeded,
  fetchFieldPropertiesIfNeeded,
  selectDataset,
  selectVisualizationType,
  selectFieldProperty,
  selectAggregationFunction
})(GallerySidebar);
