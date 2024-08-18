import { useState } from 'react';
import Nav from "./Nav"
import Footer from "./Footer"
import { Link } from 'react-router-dom';

const AllNews = () => {
  const newsData = [
    { id: 1, title: "New tool detects fake, AI-produced scientific articles", link: "https://techxplore.com/news/2024-08-tool-fake-ai-scientific-articles.html" },
    { id: 2, title: "Cracking the code of life: New AI model learns DNA's hidden language", link: "https://techxplore.com/news/2024-08-code-life-ai-dna-hidden.html" },
    { id: 3, title: "Kaspersky Study: Alarming Number of Passwords Easy to Crack", link: "https://technologytimes.pk/2024/06/28/alarming-number-of-analyzed-passwords-easy-to-crack-kaspersky/" },
    { id: 4, title: "Inviting students from all over Pakistan,A National Competition", link: "https://www.studentofpakistan.com/index.html" },
    { id: 5, title: "Apply to Turkish Universiies, Admission fall 2024", link: "https://tsapply.online/?utm_term=apply%20for%20scholarships&utm_campaign=Search+-+study+in+turkey+-+pak&utm_source=adwords&utm_medium=ppc&hsa_acc=1598902440&hsa_cam=19636476847&hsa_grp=146063200015&hsa_ad=646598146465&hsa_src=g&hsa_tgt=kwd-15198030&hsa_kw=apply%20for%20scholarships&hsa_mt=b&hsa_net=adwords&hsa_ver=3&gad_source=1&gclid=Cj0KCQjwwuG1BhCnARIsAFWBUC2L-uzdRg6SBcbtqpGNX5GAuCsJdTL2q-gCaIWPuTlzdi5lpicyVSUaAvTfEALw_wcB" },
    { title: "News 6", link: "https://example.com/news4" },
    { title: "News 7", link: "https://example.com/news4" },
    { title: "News 8", link: "https://example.com/news4" },
    { title: "News 9", link: "https://example.com/news4" },
    { title: "News 10", link: "https://example.com/news4" },
    { title: "News 10", link: "https://example.com/news5" }
  ];
  const pageSize = 8; // Number of articles per page
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(newsData.length / pageSize);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentNews = newsData.slice(startIndex, endIndex);

  return (
    <div>
      <Nav />
      <div className="md:px-14 p-3 max-w-screen-2xl mx-auto mt-[85px]">
      <div className="border-2 w-auto pb-3 rounded-xl">
        <h1 className="text-2xl font-semibold text-white bg-primary mb-3 px-4 py-4 rounded-xl">Latest and Archived News</h1>
        <ul className="text-lg font-semibold px-4">
          {currentNews.map((news, index) => (
            <li key={index} className="px-3 py-2 shadow-sm transition duration-300 ">
              <a href={news.link} className="text-lg text-primary font-bold hover:text-tertiary">{news.title}</a>
            </li>
          ))}
        </ul>

        <div className="mt-4 pl-4 flex items-center justify-center gap-5">
          <button
            className={`bg-secondary hover:bg-violet-600 text-white font-bold py-2 px-4 rounded-l focus:outline-none transition duration-300 ease-in-out ${currentPage === 1 && 'opacity-50 cursor-not-allowed'}`}
            onClick={prevPage}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <div className="text-sm text-primary">
              Page {currentPage} of {totalPages}
            </div>
          <button
            className={`bg-secondary hover:bg-violet-600 text-white font-bold py-2 px-4 rounded-r focus:outline-none transition duration-300 ease-in-out ${currentPage === totalPages && 'opacity-50 cursor-not-allowed'}`}
            onClick={nextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
    <Footer />
    </div>
  );
};

export default AllNews;
