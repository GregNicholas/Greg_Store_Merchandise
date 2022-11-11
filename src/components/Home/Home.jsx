import { useState, useEffect, useContext } from 'react';
import NavBar from '../NavBar/NavBar';
import DisplayArea from '../DisplayArea/DisplayArea';
import ProductCard from '../ProductCard/ProductCard';
import { Context } from "../../contexts/Context";

export function Home() {
	const [sortDirection, setSortDirection] = useState('descending');
	const [nameFilter, setNameFilter] = useState("");
	const [displayedProducts, setDisplayedProducts] = useState([]);

	const { products, loadingStatus } = useContext(Context);

// sort or filter when changes made
	useEffect(() => {
		if(!nameFilter) {
			const newList = [...products]
			sortByDate(newList, sortDirection)
			setDisplayedProducts(newList)
		} else if(nameFilter){
		  	const newList = [...products].filter(p => p.productName.toLowerCase().includes(nameFilter.toLowerCase()))
			sortByDate(newList, sortDirection)
		  	setDisplayedProducts(newList)
		}
	}, [nameFilter, sortDirection, products])

	const sortByDate = (list, order) => {
		if(order === 'ascending') {
			return list.sort((a,b) => a.creationTime - b.creationTime)
		} else {
			return list.sort((a,b) => b.creationTime - a.creationTime)
		}
	}
	
	return (
		<div>
			<NavBar setSortDirection={setSortDirection} nameFilter={nameFilter} setNameFilter={setNameFilter} />
			<DisplayArea loadingStatus={loadingStatus}>
				{displayedProducts.length && displayedProducts.map(p => {
					return <ProductCard key={p.id} product={p} />
				})}
			</DisplayArea>
		</div>
	);
}
