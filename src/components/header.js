import React from 'react';

const Header = (props) => {
    
          return (
            <div className="d-flex">
              <input type="text" placeholder="Search" onChange={props.filterData} />
              <div>
                  
              </div>
            </div>
          )
        }
      

      export default Header;