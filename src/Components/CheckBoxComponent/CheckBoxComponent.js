// import React, { Component } from "react";

// class CheckBoxComponent extends Component {
//   render() {
//     return <div>CheckBoxComponent</div>;
//   }
// }

// export default CheckBoxComponent;

import React from 'react'

export const CheckBoxComponent = props => {
    return (
      <li>
       <input disabled={props.disabled} key={props.id} onClick={props.handleCheckChieldElement} type="checkbox" checked={props.isChecked} value={props.skillName} /> {props.skillName}
      </li>
    )
}

export default CheckBoxComponent