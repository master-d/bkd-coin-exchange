import React, {useState, useEffect} from 'react';
//import React from 'react';
import { FaBitcoin, FaComments, FaCommentsDollar, FaDollarSign, FaChartLine } from 'react-icons/fa';

const useSelectedNavIdx = () => {
	const [selectedIdx, setSelectedIdx] = useState(0);
	
	return [ selectedIdx, setSelectedIdx ];
}
const NavList = (props) => {
	return(
		<ul className="navlist" {...props}></ul>
	)
};

const NavItem = (props) => {
	const [selectedIdx, setSelectedIdx] = useSelectedNavIdx(null);

	const handleNavItemClick = (e) => {
		setSelectedIdx(props.idx);
	}
	return(
		<li>
			<a href="#" onClick={handleNavItemClick} className={ props.idx == selectedIdx ? "selected" : null}>
				{props.item}
			</a>
		</li>
	)
}

export { NavItem };
export default NavList;
