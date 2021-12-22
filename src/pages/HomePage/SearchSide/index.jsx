import React from 'react'

const SearchSide = () => {
    return (
        <div className='searchSide col-lg-3'>
            <div className="searchSide__search">
                <input type="text" />
                <i class="fas fa-search"></i>
            </div>
            <div className="searchSide__filter">
                <h6 className="filter-title">filter by price</h6>
                
            </div>
        </div>
    )
}

export default SearchSide
