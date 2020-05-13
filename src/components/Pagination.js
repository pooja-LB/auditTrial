import React, { Component } from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import records from '../data.json';
 

class Page extends Component {
  
  constructor() {
    
    super();

    this.dataSet  = records.map((data, key)=>{
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

    // this.dataSet = records.map((a, i) => {
    //     return( a.mobile)
    // }
    // );

    this.pageSize = 5;
    this.pagesCount = Math.ceil(this.dataSet.length / this.pageSize);

    this.state = {
      currentPage: 0
    };
    
  }

  handleClick(e, index) {
    
    e.preventDefault();

    this.setState({
      currentPage: index
    });
    
  }


  render() {
    
    const { currentPage } = this.state;

    return (
    
      <React.Fragment>
      
        <div className="pagination-wrapper">
          
          <Pagination aria-label="Page navigation example">
            
            <PaginationItem disabled={currentPage <= 0}>
              
              <PaginationLink
                onClick={e => this.handleClick(e, currentPage - 1)}
                previous
                href="#"
              />
              
            </PaginationItem>

            {[...Array(this.pagesCount)].map((page, i) => 
              <PaginationItem active={i === currentPage} key={i}>
                <PaginationLink onClick={e => this.handleClick(e, i)} href="#">
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            )}

            <PaginationItem disabled={currentPage >= this.pagesCount - 1}>
              
              <PaginationLink
                onClick={e => this.handleClick(e, currentPage + 1)}
                next
                href="#"
              />
              
            </PaginationItem>
            
          </Pagination>
          
        </div>

          {this.dataSet
            .slice(
              currentPage * this.pageSize,
              (currentPage + 1) * this.pageSize
            )
            .map((data, i) => 
              <div className="data-slice" key={i}>
                {data}
              </div>
            )}

      </React.Fragment>
    
    );
  
  }
  
}

export default Page;