import { useState, useEffect } from 'react';
import NavBar from '../NavBar/NavBar';
import DisplayArea from '../DisplayArea/DisplayArea';
import ProductCard from '../ProductCard/ProductCard';
import axios from 'axios';

export function Home() {
	const [products, setProducts] = useState([])
	const [sortDirection, setSortDirection] = useState('descending')
	const [nameFilter, setNameFilter] = useState("")
	const [displayedProducts, setDisplayedProducts] = useState([])

// get products from redis when loading page
	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const data = await axios.get("/getCards")
				if(data.data.length > 0){
					const productsInfo = data.data.map(JSON.parse);
					setProducts(productsInfo);
				}
			}catch(err){
				console.log("ERROR getting products: ", err)
			}
		}
		fetchProducts()
	},[])

// sort or filter when changes made
	useEffect(() => {
		if(!nameFilter) {
			console.log("sort")
			const newList = [...products]
			sortByDate(newList, sortDirection)
			setDisplayedProducts(newList)
		} else if(nameFilter){
			console.log("sort, filter")
		  	const newList = [...products].filter(p => p.productName.includes(nameFilter))
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

	const addProduct = async (product) => {
		try {
			const {data} = await axios.post("/createCard", product);
			const updatedProducts = data.map(JSON.parse);
			setProducts(updatedProducts);
		}catch(err){
			console.log("ADD error: ", err);
		}
	}

	const editProduct = async (product, oldProduct) => {
		try {
			const {data} = await axios.put("/editProduct", { product, oldProduct })
			const updatedProducts = data.map(JSON.parse);
			setProducts(updatedProducts);
		}catch(err){
			console.log("EDIT error: ", err);
		}
	}

	const deleteProduct = async (product) => {
		try {
			const {data} = await axios.delete("/deleteProduct", { data: product });
			
			if(data.length > 0){
				const updatedProducts = data.map(JSON.parse);
				setProducts(updatedProducts);
			} else {
				setProducts([]);
			}
			
		}catch(err){
			console.log("DELETE error: ", err);
		}
	} 

	const productDisplay = displayedProducts.map(p => {
		return <ProductCard key={p.id} product={p} editProduct={editProduct} deleteProduct={deleteProduct} />
	})
	
	return (
		<div>
			<NavBar addProduct={addProduct} setSortDirection={setSortDirection} nameFilter={nameFilter} setNameFilter={setNameFilter} />
			<DisplayArea >
				{productDisplay}
			</DisplayArea>
		</div>
	);
}
