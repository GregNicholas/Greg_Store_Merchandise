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
				const { data } = await axios.get("/getProducts")
				console.log(data)
				if(data.length > 0){
					const productsInfo = data;
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
			const newList = [...products]
			sortByDate(newList, sortDirection)
			setDisplayedProducts(newList)
		} else if(nameFilter){
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
			setProducts(data);
		}catch(err){
			console.log("ADD error: ", err);
		}
	}

	const editProduct = async (product, oldProduct) => {
		try {
			const {data} = await axios.put(`/editProduct/${oldProduct.id}`, { product, oldProduct })
			setProducts(data);
		}catch(err){
			console.log("EDIT error: ", err);
		}
	}

	const deleteProduct = async (product) => {
		try {
			const {data} = await axios.delete(`/deleteProduct/${product.id}`, { data: product });
			
			if(data.length > 0){
				setProducts(data);
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
