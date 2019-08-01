import React from 'react'
import { message } from 'antd';
import 'antd/dist/antd.css';
import {connect} from 'react-redux'
import { list } from './service';
import UsersList from './components/UsersList/UsersList';


class Sider extends React.Component {
  componentDidMount(){
    this.props.dispatch(list([], 1,(err) => {
      message.error(err, 10);
    }))
  }

  render() {
    return (
      <div> 
        <UsersList requestNextPage={(currentData, page) => {
          this.props.dispatch(list(currentData, page, (err) => {
            message.error(err, 10);
          }))
        }}/>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    token: state.auth.token,
    homeResources: state.auth.currentResource.home,
  }
}

export default connect(mapStateToProps)(Sider)