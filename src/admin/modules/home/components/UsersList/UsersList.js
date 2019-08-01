import React from 'react'
import { connect } from 'react-redux'
import { Table, Button } from 'antd'
import {
    ExcelExport,
    ExcelExportColumn,
} from '@progress/kendo-react-excel-export';
import { setLocale } from '../../../auth/store/actions';

class UsersList extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            users: [],
            pagination: {},
            dataSource: 'users'
        }
    }

    _exporter;
    export = () => {
        this.setState({
            users: this.table.getLocalData()
        }, () => {
            this._exporter.save();
        })
        
    }

    handleTableChange = (pagination, filters, sorter) => {
        const pager = { ...this.state.pagination };
        pager.current = pagination.current;
        pager.total = this.props.total
        this.setState({
          pagination: pager,
        }, () => {
            if(this.state.pagination.current > this.props.lastPage){
                this.props.requestNextPage(this.props.cachedUsers, pagination.current)
                this.setState({dataSource: 'users'})
            }
            else {
                this.setState({dataSource: 'cache'})
            }
        });
    };
    
    render(){
        
        const columns = [
            {
                title: 'ID',
                dataIndex: 'id',
                defaultSortOrder: 'ascend',
                sorter: (a, b) => a.id - b.id,
            }, {
                title: 'Name',
                dataIndex: 'name',
            }
        ];

        
        const data = (this.state.pagination.current > this.props.lastPage 
        && this.state.pagination.current - this.props.lastPage !== 1)
         ? this.props.users : this.props.cachedUsers

        return(
            <div style={{width: '50%'}}>
                <Table 
                    onChange={this.handleTableChange}
                    ref={(table) => {this.table = table}} 
                    rowKey="id"
                    pagination={{
                        total: this.props.total,
                        pageSize: this.props.per_page
                    }}
                    columns={columns}
                    dataSource={this.state.dataSource === 'users' ? this.props.users : this.props.cachedUsers}
                />
                <ExcelExport
                    data={this.state.users}
                    fileName="Users.xlsx"
                    ref={(exporter) => { this._exporter = exporter; }}
                >
                    <ExcelExportColumn field="id" title="ID" locked={true} width={50}/>
                    <ExcelExportColumn field="email" title="Email" width={350}/>
                    <ExcelExportColumn field="name" title="Name" width={350}/>
                    <ExcelExportColumn field="username" title="User Name" width={350}/>
                </ExcelExport>
                <Button onClick={this.export}>{this.props.homeResources.exportExcel}</Button>
                <Button onClick={(e) => {
                    e.preventDefault()
                    this.props.dispatch(setLocale(this.props.currentLocale === 'en' ? 'ar' : 'en'))
                  }}>{this.props.currentLocale}</Button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.home.users.data,
        cachedUsers: state.home.cachedUsers,
        total: state.home.users.total,
        per_page: state.home.users.per_page,
        lastPage: state.home.lastPage,
        homeResources: state.auth.currentResource.home,
        currentLocale: state.auth.currentLocale
    }
}

export default connect(mapStateToProps)(UsersList)