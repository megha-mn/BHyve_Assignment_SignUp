import React, { Component } from "react";
import TextField from '@material-ui/core/TextField';

let TextInputField = (props) =>{
	const {label,type,value,name,onChange,Style,placeHolder,fullWidth} = props;
	return(
		<TextField 
			type={type}
			name={name}
			placeholder={placeHolder}
			label={label} 
			value={value}
			onChange={onChange}
			fullWidth={fullWidth}
			variant="outlined" 
			/>
	)
}

export default TextInputField;
