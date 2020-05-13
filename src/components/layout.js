import React, { Component } from 'react';
import records from '../data.json';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import DatePicker from "react-datepicker";
 
import "react-datepicker/dist/react-datepicker.css";

class Layout extends Component {
        constructor(){
            super();
            this.state={
                search:null,
                currentPage: 0,
                fromDate: new Date(),
                toDate: new Date()
            };

            this.pageSize = 25;
            this.pagesCount = Math.ceil(records.length / this.pageSize);
    }
        
        
    searchSpace=(event)=>{
      let keyword = event.target.value;
      this.setState({search:keyword})
    }

    handleDateToDate = date => {
        this.setState({
          toDate: date
        });
      };
      handleDateFromDate = date => {
        this.setState({
          fromDate: date
        });
      };

      handlePage = (e, index) => {
        e.preventDefault();
        this.setState({
          currentPage: index
        });
        
      }
   
    render(){
        const { currentPage } = this.state;

        const items = records.filter((data) => {
            if(this.state.search == null)
                return data
            else if(data.mobile.includes(this.state.search)){
                return data
            }
          }).slice(
            currentPage * this.pageSize,
            (currentPage + 1) * this.pageSize
          ).map((data, key)=>{
            return(
           <tr key={key}>
                <td>{data.username}</td>
                <td>{data.mobile}</td>
                <td>{data.twoFactorStatus}</td>
                <td>{data.maker}</td>
                <td>{data.approvalStatus}</td>
                <td>{data.comments}</td>
                <td>{data.userStatus}</td>
                <td>{data.fullName}</td>
                <td>{data.dateTimeCreated}</td>
                <td>{data.dateTimeModified}</td>
                <td>{data.actionType}</td>
           </tr>
           
            )
          })
      
          return (

            <div >
                <div className="d-flex w-100 pb-4">
                    <div className="w-25 position-relative">
                    <span className="position-absolute searchicon"><i className="fa fa-search"></i></span>
                        <input className="searchbar w-100" type="text" placeholder="Search" onChange={(e)=>this.searchSpace(e)} />
                    </div>
                    <div className="d-flex ml-4 mr-4 align-self-center">
                        <div className="datesel mr-2">
                            <label className="mr-2"><strong>  From Date </strong></label>
                           
                            <DatePicker
                                    selected={this.state.fromDate}
                                    onChange={this.handleDateFromDate}
                                />
                         
                        </div>
                        <div className="datesel">
                            <label className="mr-2"><strong> To Date </strong></label>
                            <DatePicker
                                    selected={this.state.toDate}
                                    onChange={this.handleDateToDate}
                                />
                        </div>
                    </div>
                    <div className="align-self-center">
                        <button className="applybtn">Apply Dates</button>
                    </div>
                </div>

                    <div className="auditPage">
                <table className="record-table">
                    <thead className="">
                        <tr>
                            <th>Username</th>
                            <th>Mobile</th>
                            <th>2- Factor Status</th>
                            <th>Maker</th>
                            <th>Approval Status</th>
                            <th>Comments</th>
                            <th>User Status</th>
                            <th>Full Name</th>
                            <th>Created At</th>
                            <th>Modified At</th>
                            <th>Action Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items}
                    </tbody>
                </table>
                </div>

                <div className="pagination-wrapper">
                        
                        <Pagination aria-label="Page navigation example">
                            
                            <PaginationItem disabled={currentPage <= 0}>
                            
                            <PaginationLink
                                onClick={e => this.handlePage(e, currentPage - 1)}
                                previous
                                href="#"
                            />
                            
                            </PaginationItem>
                
                            {[...Array(this.pagesCount)].map((page, i) => 
                            <PaginationItem active={i === currentPage} key={i}>
                                <PaginationLink onClick={e => this.handlePage(e, i)} href="#">
                                {i + 1}
                                </PaginationLink>
                            </PaginationItem>
                            )}
                
                            <PaginationItem disabled={currentPage >= this.pagesCount - 1}>
                            
                            <PaginationLink
                                onClick={e => this.handlePage(e, currentPage + 1)}
                                next
                                href="#"
                            />
                            
                            </PaginationItem>
                            
                        </Pagination>
                                
                    </div>

            </div>
          )
        }
      }

      export default Layout;