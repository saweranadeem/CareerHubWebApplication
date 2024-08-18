// NewsComponent.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const newsData = [
    { id: 1, title: "New tool detects fake, AI-produced scientific articles", link: "https://techxplore.com/news/2024-08-tool-fake-ai-scientific-articles.html" },
    { id: 2, title: "Cracking the code of life: New AI model learns DNA's hidden language", link: "https://techxplore.com/news/2024-08-code-life-ai-dna-hidden.html" },
    { id: 3, title: "Kaspersky Study: Alarming Number of Passwords Easy to Crack", link: "https://technologytimes.pk/2024/06/28/alarming-number-of-analyzed-passwords-easy-to-crack-kaspersky/" },
    { id: 4, title: "Inviting students from all over Pakistan,A National Competition", link: "https://www.studentofpakistan.com/index.html" },
    { id: 5, title: "Apply to Turkish Universiies, Admission fall 2024", link: "https://tsapply.online/?utm_term=apply%20for%20scholarships&utm_campaign=Search+-+study+in+turkey+-+pak&utm_source=adwords&utm_medium=ppc&hsa_acc=1598902440&hsa_cam=19636476847&hsa_grp=146063200015&hsa_ad=646598146465&hsa_src=g&hsa_tgt=kwd-15198030&hsa_kw=apply%20for%20scholarships&hsa_mt=b&hsa_net=adwords&hsa_ver=3&gad_source=1&gclid=Cj0KCQjwwuG1BhCnARIsAFWBUC2L-uzdRg6SBcbtqpGNX5GAuCsJdTL2q-gCaIWPuTlzdi5lpicyVSUaAvTfEALw_wcB" },
    { id: 5, title: "News 6", link: "https://example.com/news5" },
    { id: 5, title: "News 7", link: "https://example.com/news5" },
    { id: 5, title: "News 8", link: "https://example.com/news5" },
    { id: 5, title: "News 9", link: "https://example.com/news5" }
];

const NewsComponent = ({ HandeInputChange }) => {
    const [showAll, setShowAll] = useState(false);



    return (
        <div className='md:px-14 px-4 max-w-screen-2xl  mx-auto mt-12  '>
            <div className=' border-2 w-auto pb-3 rounded-xl'>
                <div>
                    <h1 className="text-2xl font-semibold text-white bg-primary mb-3 px-4 py-4 rounded-xl">Latest Updates</h1>
                    <ul className='text-lg font-semibold px-4'>
                        {showAll
                            ? newsData.map((news) => (
                                <li key={news.id} className='px-3 py-2 shadow-sm' >
                                    <a href={news.link} className="text-lg text-primary font-bold hover:text-tertiary">{news.title}</a>
                                </li>
                            ))
                            : newsData.slice(0, 5).map((news) => (
                                <li key={news.id} className='px-3 py-2 shadow-sm' >
                                    <a href={news.link} className="text-lg text-primary font-bold hover:text-tertiary">{news.title}</a>
                                </li>
                            ))}
                    </ul>
                    {!showAll && (
                        <div className=' pl-4 flex items-center'>
                            <button onClick={HandeInputChange} className="mt-4 text-primary bg-white hover:bg-primary hover:text-white font-bold py-2 px-4 border-solid border-2 border-primary rounded">
                                < a href='/all-news'>View More</a>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NewsComponent;
