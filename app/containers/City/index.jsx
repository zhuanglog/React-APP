import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import Header from '../../components/Header'
import CurrentCity from '../../components/CurrentCity'
import CityList from '../../components/CityList'

import LocalStore from '../../util/localStore.js'
import {CITYNAME} from '../../config/localStoreKey.js'
import * as userInfoActionsFromOtherFile from '../../actions/userinfo.js'

import {bindActionCreators} from 'redux'
import { hashHistory } from 'react-router'
import { connect } from 'react-redux'


class City extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        return (
        	<div>
	            <Header title='选择城市'/>
	            <CurrentCity cityName={this.props.userinfo.cityName}/>
	            <CityList changeFn={this.changeCity.bind(this)}/>
            </div>
        )
    }
    changeCity(newCity){
    	if (newCity == null){
    		return
    	}
        //修改Redux
    	const userinfo = this.props.userinfo
    	userinfo.cityName = newCity
    	this.props.userInfoActions.update(userinfo)
    	 
    	//修改LocalStore
        LocalStore.setItem(CITYNAME,newCity) 
         
        hashHistory.push('/')
    }
}


function mapStateToProps(state){
    return {
        userinfo: state.userinfo
    }
}

function mapDispatchToProps(dispatch){
    return {
    userInfoActions:bindActionCreators(userInfoActionsFromOtherFile,dispatch)
    }  
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(City)

