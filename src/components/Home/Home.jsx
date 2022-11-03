import { useState, useEffect } from 'react';
import NavBar from '../NavBar/NavBar';
import DisplayArea from '../DisplayArea/DisplayArea';
import ProductCard from '../ProductCard/ProductCard';
import axios from 'axios';

export function Home() {
	const [products, setProducts] = useState([]);
	const [sortDirection, setSortDirection] = useState('descending');
	const [nameFilter, setNameFilter] = useState("");
	const [displayedProducts, setDisplayedProducts] = useState([]);
	const [loadingStatus, setLoadingStatus] = useState({status: '', error: ''});

// get products from redis when loading page
	useEffect(() => {
		const fetchProducts = async () => {
			setLoadingStatus({status: 'loading', error: ''});
			try {
				const { data } = await axios.get("/getProducts");
				console.log(data)
				if(data.length > 0){
					const productsInfo = data;
					setProducts(productsInfo);
				}
				setLoadingStatus({status: '', error: ''});
			}catch(err){
				setLoadingStatus({status: 'error', error: err});
				console.log("ERROR getting products: ", err);
			}
		}
		fetchProducts();
	},[])

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

	const addProduct = async (product) => {
		setLoadingStatus({status: 'loading', error: ''});
		try {
			const {data} = await axios.post("/createCard", product);
			setProducts(data);
			setLoadingStatus({status: '', error: ''});
			setLoadingStatus({status: '', error: ''});
		}catch(err){
			console.log("ADD error: ", err);
			setLoadingStatus({status: 'error', error: err});
		}
	}

	const editProduct = async (product, oldProduct) => {
		setLoadingStatus({status: 'loading', error: ''});
		try {
			const {data} = await axios.put(`/editProduct/${oldProduct.id}`, { product, oldProduct })
			setProducts(data);
			setLoadingStatus({status: '', error: ''});
		}catch(err){
			console.log("EDIT error: ", err);
			setLoadingStatus({status: 'error', error: err});
		}
	}

	const deleteProduct = async (product) => {
		setLoadingStatus({status: 'loading', error: ''});
		try {
			const {data} = await axios.delete(`/deleteProduct/${product.id}`, { data: product });
			
			if(data.length > 0){
				setProducts(data);
			} else {
				setProducts([]);
			}
			setLoadingStatus({status: '', error: ''});
		}catch(err){
			console.log("DELETE error: ", err);
			setLoadingStatus({status: 'error', error: err});
		}
	} 
	
	return (
		<div>
			<NavBar addProduct={addProduct} setSortDirection={setSortDirection} nameFilter={nameFilter} setNameFilter={setNameFilter} />
			<DisplayArea loadingStatus={loadingStatus}>
				{displayedProducts.length && displayedProducts.map(p => {
					return <ProductCard key={p.id} product={p} editProduct={editProduct} deleteProduct={deleteProduct} />
				})}
			</DisplayArea>
		</div>
	);
}
