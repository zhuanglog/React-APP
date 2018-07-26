import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { getSearchData } from '../../../fetch/search/search' 

import ListComponent from '../../../components/List'
import LoadMore from '../../../components/LoadMore'

import { connect } from 'react-redux'


class SearchList extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
        	data:[],   //存储列表信息
        	hasMore:true,  //是否有下一页
            isLoadingMore: false, //记录当前是加载中还是点击加载更多
            page: 0 //下一页的页码
        }
    }
    render() {
        return (
            <div>
	            {
                    this.state.data.length
                    ?<ListComponent data={this.state.data}/>
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
        const cityName = this.props.userinfo.cityName
        const keyword = this.props.keyword || ''
        const category = this.props.category
        const result = getSearchData(0, cityName, category, keyword)
        this.resultHandle(result);
    }
    //加载更多数据
    loadMoreData(){
        this.setState({
            isLoadingMore:true
        })

        const cityName = this.props.userinfo.cityName
        const page = this.state.page
        const keyword = this.props.keyword || ''
        const category = this.props.category
        const result = getSearchData(page, cityName, category, keyword)
        this.resultHandle(result)

        this.setState({
            page:this.state.page + 1,
            isLoadingMore: false
        })
    }

    //处理数据
    resultHandle(result){

        const page = this.state.page
        this.setState({
            page: page + 1
        })

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

    componentDidUpdate(prevProps,prevState){
        const keyword = this.props.keyword
        const category = this.props.category

        //判断搜索条件与之前是否相同
        if (prevProps.keyword === keyword && prevProps.category === category){
           return
        }
        //所有状态全部重置
        this.setState({
            data:[],   //存储列表信息
            hasMore:true,  //是否有下一页
            isLoadingMore: false, //记录当前是加载中还是点击加载更多
            page: 0 //下一页的页码
        })
        //加载数据
        this.loadFirstPageData()

    }
}

function mapStateToProps(state) {
    return {
        userinfo: state.userinfo
    }
}

function mapDispatchToProps(dispatch) {
    return {
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchList)

