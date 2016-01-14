import { combineReducers } from 'redux';
import {routerStateReducer as router} from 'redux-react-router';
import { LOAD, SAVE } from 'redux-storage';

import comparisonSelector from './comparisonSelector';
import datasets from './datasets';
import datasetSelector from './datasetSelector';
import exportedSpec from './exportedSpec';
import fieldProperties from './fieldProperties';
import filters from './filters';
import gallerySelector from './gallerySelector';
import project from './project';
import projects from './projects';
import regressionSelector from './regressionSelector';
import specs from './specs';
import transformSelector from './transformSelector';
import user from './user';
import visualization from './visualization';

const rootReducer = combineReducers({
  comparisonSelector,
  datasets,
  datasetSelector,
  exportedSpec,
  fieldProperties,
  filters,
  gallerySelector,
  project,
  projects,
  regressionSelector,
  specs,
  transformSelector,
  user,
  visualization,
  router
});

export default rootReducer;