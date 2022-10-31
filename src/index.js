import 'react';
import 'react-dom';
import './main.css';
import component from './component';
import { bake } from './shake';
bake();

let demoComponent = component();
document.body.appendChild(demoComponent);

// HMR interface
if (module.hot) {
  // Capture hot update
  module.hot.accept('./component', () => {
    const nextComponent = component();

    // Replace old content with the hot loaded one
    document.body.replaceChild(nextComponent, demoComponent);

    demoComponent = nextComponent;
  });
}
