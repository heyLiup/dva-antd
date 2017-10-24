import React from 'react';
import { connect } from 'dva';
import styles from './Form.css';
import ProductList from '../components/Form.js'

// const Products=({dispatch,products})=>{
//   function handleDelete(id){
//     dispatch({
//       type:'products/delete',
//       payload:{id},
//     });
//   }
//   return (
//     <div>
//       <h2>List of Products</h2>
//       <ProductList onDelete={handleDelete} products={products}/>
//     </div>
//   )

// }

class Products extends React.Component{
  constructor(props){
    super(props);
    this.handleDelete=this.handleDelete.bind(this);
  }
  handleDelete(id){
    this.props.dispatch({
      type:'products/delete',
      payload:{id},
    });
  }
  componentDidMount(){
    const breadData={
    breadcrumb:[
      {
        name:'首页',
        path:'/'
      },
      {
        name:"From"
      }
    ]}
    this.props.dispatch({
      type:"common/changeBreadcrumb",
      payload:breadData
    })
  }
  render(){
    return (
      <div>
        <h2>List of Products</h2>
        <ProductList onDelete={this.handleDelete} products={this.props.products}/>
      </div>
    )
  }
  
}


function mapStateToProps() {
  return {};
}

// export default connect(mapStateToProps)(Form);
export default connect(({ products }) => ({
  products,
}))(Products);