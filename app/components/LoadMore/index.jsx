import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './style.less'

class LoadMore extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        return (
        	<div className='load-more' ref = 'wrapper'>
               {
               	this.props.isLoadingMore
               	?<span>加载更多...</span>
               	:<span onClick = {this.loadMoreHandle.bind(this)}>加载更多</span>
               }
        	</div>
        )
    }

    loadMoreHandle(){
    	this.props.loadMoreFn();
    }

    componentDidMount(){
        const wrapper = this.refs.wrapper
        const loadMoreFn = this.props.loadMoreFn
    	let timeoutId

    	function callBack () {
    		const top = wrapper.getBoundingClientRect().top
    		const windowHeight = window.screen.height
    		if (top && top < windowHeight){
    			loadMoreFn()
    		}
    	}
        
    	window.addEventListener('scroll',function(){
    		if (this.props.isLoadingMore) {
    			return
    		}

    		if (timeoutId){
    			clearTimeout(timeoutId)
    		}

    		timeoutId = setTimeout(callBack,50)

    	}.bind(this),false)
    }
}

// 使用 require.ensure 异步加载，还不支持 ES6 的 export 
 export default LoadMore

