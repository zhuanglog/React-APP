// home-分类
import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {connect} from 'react-redux'
import { getAdData } from '../../../fetch/home/home'
import HomeAd from '../../../components/HomeAd/index'

class Ad extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            data:[]
        }
    }
    render() {
        return (
            <div>
              {
                this.state.data.length?
                <HomeAd data={this.state.data}/>:
                <div>加载中</div>
              }
            </div>
        )
    }
    
    componentDidMount(){
        const result = getAdData()
        result.then(res => {
            return res.json()
        }).then(json => {
            // 处理获取的数据
            const data = json
            if (data.length) {
                this.setState({
                    data: data
                })
            }
        }).catch(ex => {
            // 发生错误
            if (__DEV__) {
                console.error('首页广告模块获取数据报错, ', ex.message)
            }
        })
    }
}

function mapStateToProps(state){
    return {
    }
}

function mapDispatchToProps(dispatch){
    return {
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Ad)