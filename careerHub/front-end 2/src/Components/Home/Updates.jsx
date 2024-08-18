import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Updates = () => {
  const newsArticles = [
    { title: 'Article 1', link: 'https://example.com/article1' },
    { title: 'Article 2', link: 'https://example.com/article2' },
    { title: 'Article 3', link: 'https://example.com/article3' },
    { title: 'Article 3', link: 'https://example.com/article3' },
    { title: 'Article 3', link: 'https://example.com/article3' },
    { title: 'Article 3', link: 'https://example.com/article3' },
    // Add more articles as needed
  ];

//   const history = useHistory();
  const pageSize = 5;
//   const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(newsArticles.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, newsArticles.length);
  const currentArticles = newsArticles.slice(startIndex, endIndex);

//   const handleShowMore = () => {
//     history.push('/all-news');
//   };

//   const nextPage = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const prevPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

  return (
    <div className="md:px-14 px-4 max-w-screen-2xl mx-auto mt-12">
      <div className="border-2 w-auto pb-3">
        <h1 className="text-2xl font-semibold text-white bg-primary mb-3 px-4 py-4">Latest News</h1>
        <ul>
          {currentArticles.map((article, index) => (
            <li key={index} className="px-4 py-2">
              <a href={article.link} className="text-gray-800 cursor-pointer hover:text-gray-400 duration-500" target="_blank" rel="noopener noreferrer">
                {article.title}
              </a>
            </li>
          ))}
        </ul>
        <button className="px-3 py-2 mb-3 border-primary border-2 hover:bg-primary hover:text-white" onClick={handleShowMore}>
          Show More
        </button>
        {/* <div className="mt-4 pl-4 flex items-center">
          <button className={`bg-secondary hover:bg-violet-600 text-white font-bold py-2 px-4 rounded-l focus:outline-none ${currentPage === 1 && 'opacity-50 cursor-not-allowed'}`} onClick={prevPage} disabled={currentPage === 1}>
            Prev
          </button>
          <button className={`bg-secondary hover:bg-violet-600 text-white font-bold py-2 px-4 rounded-r focus:outline-none ${currentPage === totalPages && 'opacity-50 cursor-not-allowed'}`} onClick={nextPage} disabled={currentPage === totalPages}>
            Next
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default Updates;
