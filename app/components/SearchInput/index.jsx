import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './style.less'

class SearchInput extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
        	value : ''
        }
    }
    render() {
        return (
            <input 
            className="search-input"
            type = 'text'
            placeholder = '请输入关键字'
            onChange = {this.ChangeHandle.bind(this)}
            onKeyUp = {this.KeyUpHandle.bind(this)}
            value = {this.state.value}
            ></input>
        )
    }
    componentDidMount(){
    	this.setState({
    		value : this.props.value || ''
    	})
    }
    ChangeHandle(event){
        this.setState({
            value:event.target.value
        })
    }
    KeyUpHandle(event){
    	//响应回车键事件
        if (event.keyCode !== 13){
            return
        }
        this.props.enterHandle(this.state.value)
    }
}

// 使用 require.ensure 异步加载，还不支持 ES6 的 export 
 export default SearchInput
