import React from "react";
import { Button } from "react-bootstrap";

class Example extends React.Component {
  render() {
    return (
      <div>
        <button type="button" className="btn btn-primary">Primary</button>
<button type="button" className="btn btn-secondary">Secondary</button>
<button type="button" className="btn btn-success">Success</button>
<button type="button" className="btn btn-danger">Danger</button>
<button type="button" className="btn btn-warning">Warning</button>
<button type="button" className="btn btn-info">Info</button>
<button type="button" className="btn btn-light">Light</button>
<button type="button" className="btn btn-dark">Dark</button>

<button type="button" className="btn btn-link">Link</button>

<Button outline color="primary">primary</Button>{' '}
      <Button outline color="secondary">secondary</Button>{' '}
      <Button outline color="success">success</Button>{' '}
      <Button outline color="info">info</Button>{' '}
      <Button outline color="warning">warning</Button>{' '}
      <Button outline color="danger">danger</Button>
      </div>
    );
  }
}

export default Example;