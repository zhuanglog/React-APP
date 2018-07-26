import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Item from './Item'

import './style.less'

class List extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        return (
            <div>
            	{
            		this.props.data.map((item,index)=>{
            			return <Item data={item} key={index}/>
            		})
            	}
            </div>
        )
    }
}


 export default List

