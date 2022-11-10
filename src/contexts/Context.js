import React, { useState, useEffect, createContext } from "react";
import axios from 'axios';

const Context = createContext();

function ContextProvider({ children }) {
    const [products, setProducts] = useState([]);
    const [loadingStatus, setLoadingStatus] = useState({status: '', error: ''});

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

    const addMultipleProducts = async (newProducts) => {
        console.log("in context multiple: ", newProducts)
            setLoadingStatus({status: 'loading', error: ''});
            try {
            // map the new products in a Promise.all 
            const results = await Promise.all(newProducts.map((p) => {
                return axios.post("/createCard", p);
            }));
            // use data from the last product to set data in the display
            // might be better to getProducts after the promises are fulfilled
			// or possibly make a new route in the server and edit this
            setProducts(results[results.length-1].data);
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

	const deleteMultipleProducts = async (products) => {
		setLoadingStatus({status: 'loading', error: ''});
		
		try {
			const {data} = await axios.delete('/deleteMultipleProducts', { data: products });

			if(data.length > 0){
				setProducts(data);
			} else {
				setProducts([]);
			}
			setLoadingStatus({status: '', error: ''});
		}catch(err){
			console.log("delete multiple error: ", err);
			setLoadingStatus({status: 'error', error: err});
		}
	}

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
	},[]);

    return (
        <Context.Provider
            value={{
                loadingStatus,
                products,
                addProduct,
                addMultipleProducts,
                editProduct,
                deleteProduct,
				deleteMultipleProducts,
            }}
        >
        {children}
        </Context.Provider>
    );
    }

    export { ContextProvider, Context };
