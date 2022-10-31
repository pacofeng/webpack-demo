import 'react';
import 'react-dom';
import './main.css';
import component from './component';
import { bake } from './shake';
import component2 from './component2';
bake();

let demoComponent = component();
document.body.appendChild(demoComponent);
document.body.appendChild(component2());

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
