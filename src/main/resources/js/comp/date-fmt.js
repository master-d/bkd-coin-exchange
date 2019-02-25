import React, {useState, useEffect, useContext, createContext} from 'react';

const DateFmt = (props) => {
	const dt = new Date(props.date);
	const formattedDt = new Intl.DateTimeFormat('en-US', {
		month: 'long',
		day: 'numeric',
		year: 'numeric',
		hour: 'numeric',
		minute: '2-digit'
	}).format(dt);
	
	return (
		<span class='date'>{formattedDt}</span>
	)
}

export default DateFmt;