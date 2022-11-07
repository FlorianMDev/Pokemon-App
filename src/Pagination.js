import React from 'react';

function Pagination({ previousPageURL, nextPageURL, goToPreviousPage, goToNextPage, display, currentGen, setCurrentGen }) {

    return (
        <div className="pagination">
            {/* If display is pages-based :  */}
            {display === 'pages' &&
                <button onClick={previousPageURL ? goToPreviousPage : null}>
                    {previousPageURL ? 'Previous Page' : 'This is the first Page !'}
                </button>
            }
            {display === 'pages' &&
                <button onClick={nextPageURL ? goToNextPage : null}>
                    {nextPageURL ? 'Next Page' : 'This is the last Page !'}
                </button>
            }
            {/* If display is generation-based :  */}
            {display === 'generations' &&
                <button onClick={currentGen > 1 ? () => setCurrentGen(currentGen - 1) : null}>
                    {currentGen > 1 ? `Previous Generation (${currentGen - 1})` : 'This is the first Generation'}
                </button>
            }
            {display === 'generations' &&
                <button onClick={currentGen < 9 ? () => setCurrentGen(currentGen + 1) : null}>
                    {currentGen < 9 ? `Next Generation (${currentGen + 1})` : 'This is the last Generation'}
                </button>
            }
        </div>
    );
}

export default Pagination;
