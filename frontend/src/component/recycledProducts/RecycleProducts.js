// import React , {useState} from 'react';
// import "./RecycleProducts.css";

// const RecycleProducts = () => {
    

  return (
    <>
    <div id='recycle-product-dashbord'>
        <div id='RecycleProductsDashBoard'>
           <div id='RecycleProductsLeftDiv'>
                <div>
                    <p className='RecycleProductsLeftDashboardTitle'>Product and Recycling Dashboard</p> 
                    <a href='/recycling-products' id='RecyclingProductsButton-a'><button id='RecyclingProductsButton'>Recycling Products</button></a>
                    <a href='/recycled-products' id='RecycledProductsButton-a'><button id='RecycledProductsButton'>Recycled Products</button></a>
                    <div id='image-div'>
                    </div>
                </div>
            </div>
            <div id='RecycleProductsRightDiv'>
                <ul>
                    <a href="/recycled-products"><ui>Complete</ui></a>
                    <a href="/recycling-products"><ui>In Progress</ui></a>
                    <a href="/recycling-products"><ui>Quality Good</ui></a>
                    <a href="/recycling-products"><ui>Quality Medium</ui></a>
                    <a href="/recycling-products"><ui>Quality Low</ui></a>
                </ul>
                <ul>
                    <a href="/recycled-products"><ui>5</ui></a>
                    <a href="/recycling-products"><ui>4</ui></a>
                    <a href="/recycling-products"><ui>4</ui></a>
                    <a href="/recycling-products"><ui>0</ui></a>
                    <a href="/recycling-products"><ui>0</ui></a>
                </ul>
            </div>
        </div>
    </div>
  </>
  )
}

export default RecycleProducts