import React from "react";
import ReactDOM from 'react-dom'; 
import './index.css';

const listProd = [
    {category: 'Sport', nameProd: 'ball', price: '$12'},
    {category: 'Fishing', nameProd: 'fishnet', price: '$12'},
    {category: 'Sport', nameProd: 'ball', price: '$12'},
    {category: 'Camping', nameProd: 'tent', price: '$41'},
    {category: 'Camping', nameProd: 'frost', price: '$241'},
    {category: 'Camping', nameProd: 'axe', price: '$61'},

]

function searchProd(arr, itemArr){
    const listProd = arr;
    let prod = itemArr;
    let resSearch = []
    for(let i in listProd){
        let itemListProd = listProd[i];
        for(let i in itemListProd){
            if(itemListProd[i] === prod){
                resSearch.push(itemListProd)
                break}
        }
    }
    if(resSearch.length === 0) {
        alert('Элемент не найден')
    } else {
        return resSearch
    }
}


class Product extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        const product = this.props.prod;
        return(
            <div className="product">
                <h5 className="product-name">
                    Name: {product.nameProd}
                </h5>
                <span className="product-price">
                    Price: {product.price}
                </span >
                <p className="product-category">
                    Category: {product.category} 
                </p>
            </div>
        )
    }
}

class ProductList extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        const listProd = this.props.resSearch;
        const output = listProd.map((product) => {
            return <Product prod={product}/>
        })
        // console.log(output);
        return(
            <div className="product-list">
                Результат поиска:
                {output}
            </div>
        )
    }
}
let result = [];
class Search extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            value: '',
        }

        this.onSearch = this.onSearch.bind(this)
        this.onStart = this.onStart.bind(this)
    }

    onSearch(e){
        this.setState({
            value: e.target.value
        })
    }

    onStart(e){
        this.props.onSearchProd(this.state.value);
        result = searchProd(listProd, this.state.value);
        console.log('result = '+ result);
    }

    render() {
        return(
            <div>
                <input type='text' onChange={this.onSearch}/>
                <button onClick={this.onStart}>Поиск</button>
            </div>
        )
    }
}

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            value: 'Andrey',
        }
        
        this.search =this.search.bind(this)
    }

    search(e){
        this.setState({
            value: e,
        })
    }

    render() {
        const product = this.state.value;
        // const products = searchProd(this.props.products, product);
        const products = result;
        // console.log(products);
        return(
            <div>
                Для пробного поиска: 
                ball
                fishnet
                tent
                frost
                <Search onSearchProd={this.search}/>
                <ProductList resSearch={products}/>
            </div>
        )
    }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App products={listProd}/>
)