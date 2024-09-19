import React , {useState} from 'react';
import "./RecycleProducts.css";

const RecycleProducts = () => {
    

  return (
    <div id='product-dashbord'>
        <div id='RecycleProductsDashBoard'>
           <div id='RecycleProductsLeftDiv'>
                <div>
                    <p className='RecycleProductsLeftDashboardTitle'>Product and Recycling Dashboard</p> 
                    <a href='/recycling-products' id='RecyclingProductsButton-a'><button id='RecyclingProductsButton'>Recycling Products</button></a>
                    <a href='/recycling-products' id='RecycledProductsButton-a'><button id='RecycledProductsButton'>Recycleld Products</button></a>
                    <div id='image-div'>
                    </div>
                </div>
            </div>
            <div id='RecycleProductsRightDiv'>
                <ul>
                    <a href=""><ui>Complete</ui></a>
                    <a href=""><ui>In Progreess</ui></a>
                    <a href=""><ui>Qulity Good</ui></a>
                    <a href=""><ui>Qurlity Medium</ui></a>
                    <a href=""><ui>Qulity Low</ui></a>
                </ul>
                <ul>
                    <a href=""><ui>5</ui></a>
                    <a href=""><ui>4</ui></a>
                    <a href=""><ui>4</ui></a>
                    <a href=""><ui>0</ui></a>
                    <a href=""><ui>0</ui></a>
                </ul>
            </div>
        </div>
    </div>
  )
}

export default RecycleProducts