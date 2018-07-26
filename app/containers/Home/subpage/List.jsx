import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { getListData } from '../../../fetch/home/home' 
import ListCompoent from '../../../components/List'
import LoadMore from '../../../components/LoadMore'

import './style.less'

class List extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
        	data:[],   //存储列表信息
        	hasMore:true,  //是否有下一页
            isLoadingMore: false, //记录当前是加载中还是点击加载更多
            page: 1 //下一页的页码
        }
    }
    render() {
        return (
            <div>
	            <h2 className="home-list-title">猜你喜欢</h2>
	            {
                    this.state.data.length
                    ?<ListCompoent data={this.state.data}/>
                    :<div>加载中</div>
                }
                {
                    this.state.hasMore
                    ?<LoadMore isLoadingMore={this.state.isLoadingMore} loadMoreFn={this.loadMoreData.bind(this)}/>
                    :''
                }
            </div>
        )
    }
    componentDidMount(){
        this.loadFirstPageData()
    }
    //加载首屏数据
    loadFirstPageData(){
        const cityName = this.props.cityName
        const result = getListData(cityName,0)

        this.resultHandle(result);
    }
    //加载更多数据
    loadMoreData(){
        this.setState({
            isLoadingMore:true
        })

        const cityName = this.props.cityName
        const page = this.state.page
        const result = getListData(cityName,page)

        this.resultHandle(result)

        this.setState({
            page:this.state.page + 1,
            isLoadingMore: false
        })
    }
    //处理数据
    resultHandle(result){
    	result.then(res => {
           return res.json()
    	}).then(json => {
    	   const hasMore = json.hasMore
    	   const data = json.data

    	   this.setState({
    	   	data: this.state.data.concat(data),
    	   	hasMore: hasMore
    	   })
    	}).catch(ex => {
            if (__DEV__) {
                console.error('首页”猜你喜欢“获取数据报错, ', ex.message)
            }
        })
    }
}

// 使用 require.ensure 异步加载，还不支持 ES6 的 export 
export default List

