import { useState, useEffect } from 'react';
import NavBar from '../NavBar/NavBar';
import DisplayArea from '../DisplayArea/DisplayArea';
import ProductCard from '../ProductCard/ProductCard';
import { Row, Col } from 'react-bootstrap';

export function Home() {
	const [products, setProducts] = useState([])
	const [sortDirection, setSortDirection] = useState(null)
	const [nameFilter, setNameFilter] = useState("")
	const [displayedProducts, setDisplayedProducts] = useState([])

	// useEffect(() => {
	// 	setDisplayedProducts([...products])
	// },[products])

	useEffect(() => {
		if(nameFilter && !sortDirection){
		  	const newList = [...products].filter(p => p.productName.includes(nameFilter))
		  	setDisplayedProducts(newList)
		} else if(sortDirection && !nameFilter) {
			const newList = [...products]
			sortByDate(newList, sortDirection)
			setDisplayedProducts(newList)
		} else if(sortDirection && nameFilter){
		  	const newList = [...products].filter(p => p.productName.includes(nameFilter))
			sortByDate(newList, sortDirection)
		  	setDisplayedProducts(newList)
		}else if(!nameFilter && !sortDirection) {
		  setDisplayedProducts(products)
		}
	  
	}, [nameFilter, sortDirection, products])

	const sortByDate = (list, order) => {
		if(order === 'ascending') {
			return list.sort((a,b) => a.creationTime - b.creationTime)
		} else {
			return list.sort((a,b) => b.creationTime - a.creationTime)
		}
	}

	const addProduct = (product) => {
		setProducts(prev => [product, ...prev])
	}

	const editProduct = (product) => {
		const newProducts = products.map(p => {
			if(p.id === product.id) {
				return product
			} else {
				return p
			}
		})
		setProducts(newProducts)
	}

	const deleteProduct = (id) => {
		setProducts(prev => {
			return prev.filter(p => p.id !== id)
		})
	} 

	const productDisplay = displayedProducts.map(p => {
		return <ProductCard key={p.id} product={p} editProduct={editProduct} deleteProduct={deleteProduct} />
	})
	
	return (
		<div>
			<NavBar addProduct={addProduct} setSortDirection={setSortDirection} nameFilter={nameFilter} setNameFilter={setNameFilter} />
			{/* <h1>Breinify Code Challenge</h1> */}
			<DisplayArea >
				{productDisplay}
			</DisplayArea>
			
		</div>
	);
}
