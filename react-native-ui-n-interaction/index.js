import { registerRootComponent } from 'expo';

import App from './App';
import LotsOfStyles from './components/Styles.js';
import FixedDimensionsBasics from './components/FixedDimensions.js';
import FlexDimensionsBasics from './components/FlexDimensions.js';


// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(FlexDimensionsBasics);
