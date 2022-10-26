import { useState, useEffect } from 'react';
import NavBar from '../NavBar/NavBar';
import DisplayArea from '../DisplayArea/DisplayArea';
import ProductCard from '../ProductCard';
import { Row, Col } from 'react-bootstrap';

export function Home() {
	const [products, setProducts] = useState([])

	const productInfo = {
		productImg: "https://picsum.photos/286/180.jpg",
		productName: "Name of Product",
		description: "Some quick example text to build on the card title and make up the bulk of the card's content.",
		creationTime: new Date()
	}

	const addProduct = (product) => {
		setProducts(prev => [...prev, product])
	}

	const displayProducts = products.map(p => {
		return <ProductCard key={p.id} productInfo={p} />
	})

	return (
		<div>
			<NavBar addProduct={addProduct}/>
			{/* <h1>Breinify Code Challenge</h1> */}
			<DisplayArea >
				{displayProducts}
			</DisplayArea>
			
		</div>
	);
}
