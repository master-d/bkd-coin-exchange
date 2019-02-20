import React, {useState, useEffect, useContext, createContext} from 'react';
import { FaBitcoin, FaComments, FaCommentsDollar, FaDollarSign, FaChartLine } from 'react-icons/fa';

export const SelectedNavCtx = createContext([0, () => {}, () => {}]);
const iconMap = { "chart": (<FaChartLine/>), "bidaskform": (<FaBitcoin/>) };

const NavList = (props) => {
	const [selectedIdx, setSelectedIdx] = useState(0);
	return(
		<SelectedNavCtx.Provider value={[selectedIdx,setSelectedIdx,props.onNavClick]}>
			<ul className={props.className || "navlist"} {...props}></ul>
		</SelectedNavCtx.Provider>
	)
};

const NavItem = (props) => {
	const [selectedIdx, setSelectedIdx, parentNavClick] = useContext(SelectedNavCtx);
	const handleNavItemClick = (e) => {
		e.preventDefault();
		setSelectedIdx(props.idx);
		parentNavClick(props);
	}
	return(
		<li onClick={handleNavItemClick} className={ props.idx == selectedIdx ? "selected" : null}>
			<a href="#">
				<span className="icon">{iconMap[props.icon]}</span>
				{props.item}
			</a>
		</li>
	)
}

export { NavItem };
export default NavList;
