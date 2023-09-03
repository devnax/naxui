## Switch Component Documentation

### Overview
The Switch component is a customizable, accessible toggle switch input for React applications. It provides a user-friendly way to toggle between two states, such as on/off, true/false, or enabled/disabled. This component is built on top of the Tag component from 'naxui-manager' and enhances it with specific switch functionality.


### Usage
To use the Switch component, import it and integrate it into your React application as follows:

```tsx
import React from 'react';
import Switch from './Switch'; // Update the import path accordingly

function MySwitchComponent() {
  const handleSwitchChange = (event) => {
    // Handle the switch state change here
    console.log('Switch is now:', event.target.checked);
  };

  return (
    <Switch
      checked={true} // Set the initial state (true for on, false for off)
      color="primary" // Customize the color (optional)
      size={44} // Customize the size (optional)
      onChange={handleSwitchChange} // Handle state change (optional)
    />
  );
}
```


### Props
The `Switch` component accepts the following props:



- `checked` (boolean, optional): Indicates whether the switch is in the "on" state. Defaults to `false`.
- `color` (string, optional): Sets the color of the switch. Possible values are "primary," "secondary," "success," "error," or "warning." Defaults to "primary."
- `size` (number, optional): Specifies the size of the switch in pixels. Defaults to 44px.
- `onChange` (function, optional): Callback function triggered when the switch state changes. It receives an event object as an argument.
- `disabled` (boolean, optional): Disables the switch when set to true.


## Styling
You can further customize the appearance of the Switch component by using CSS classes and inline styles. The switch elements can be styled using standard CSS properties.


## Forwarding Refs
The Switch component supports the use of React's forwarding refs, allowing you to access and interact with the underlying input element if needed.

```jsx
const switchRef = React.createRef();

<Switch ref={switchRef} />;

```
