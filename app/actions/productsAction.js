export function getProducts(){
    return (dispatch) => {
 
       fetch('http://192.168.10.100/wooAPI/')
      .then(response => response.json())
      .then(responseJson => {
      	dispatch({
            type: 'LOADING_PRODUCT',
            payload: {}
        });
       // this.setState({re:responseJson[0].name})
       	  dispatch({
            type: 'GET_PRODUCT',
            payload: {products:responseJson}
        });
      
      });

    };
}