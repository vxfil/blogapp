import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadPosts } from '../store/actions/postsActions';

import { Post } from '../components/Post';

export const Posts = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.postReducer.posts);

  let [currentPage, setCurrentPage] = useState(1);
  let [totalPages, setTotalPages] = useState(10);

  const generateNumOfPages = () => {
    const pages = [];
    for (let i = 2; i <= totalPages - 1; i++) {
      pages.push(i);
    }
    return pages;
  };

  const generateClassName = (page) => {
    if (page === currentPage) {
      return 'pagination-link is-current';
    }
    if (
      (page > currentPage && page < currentPage + 3) ||
      (page >= totalPages - 3 && page < currentPage + 3)
    ) {
      return 'pagination-link';
    }

    return 'pagination-link is-hidden';
  };

  const next = () => {
    if (currentPage === totalPages) {
      return;
    }
    return setCurrentPage((currentPage += 1));
  };

  const prev = () => {
    if (currentPage === 1) {
      return;
    }
    return setCurrentPage((currentPage -= 1));
  };

  return (
    <div className="hero is-fullheight-with-navbar">
      <div className="container">
        <h1>Posts page</h1>
        <button
          className="button is-success"
          onClick={() => dispatch(loadPosts())}
        >
          Download posts
        </button>
        {posts.map((post, index) => {
          return <Post title={post.title} content={post.content} key={index} />;
        })}
      </div>
      {/* // POSTS */}
      <div className="footer" style={{ padding: '1.5rem' }}>
        <nav
          className="pagination is-centered"
          role="navigation"
          aria-label="pagination"
        >
          <a
            className="pagination-previous"
            title="This is the first page"
            onClick={() => prev()}
          >
            Previous
          </a>
          <a className="pagination-next" onClick={() => next()}>
            Next page
          </a>
          <ul className="pagination-list">
            <li>
              <a
                onClick={() => setCurrentPage(1)}
                className={
                  1 === currentPage
                    ? 'pagination-link is-current'
                    : 'pagination-link'
                }
                aria-label={1 === currentPage ? `Page ${1}` : `Goto page ${1}`}
                aria-current={1 === currentPage ? 'page' : ''}
              >
                {1}
              </a>
            </li>
            {totalPages < 3 ? null : (
              <li>
                <span className="pagination-ellipsis">&hellip;</span>
              </li>
            )}
            {generateNumOfPages().map((page, ind) => {
              return (
                <li key={ind}>
                  <a
                    onClick={() => setCurrentPage(page)}
                    className={generateClassName(page)}
                    aria-label={
                      page === currentPage
                        ? `Page ${page}`
                        : `Goto page ${page}`
                    }
                    aria-current={page === currentPage ? 'page' : ''}
                  >
                    {page}
                  </a>
                </li>
              );
            })}
            {totalPages < 3 ? null : (
              <li>
                <span className="pagination-ellipsis">&hellip;</span>
              </li>
            )}
            {totalPages < 2 ? null : (
              <li>
                <a
                  onClick={() => setCurrentPage(totalPages)}
                  className={
                    totalPages === currentPage
                      ? 'pagination-link is-current'
                      : 'pagination-link'
                  }
                  aria-label={
                    totalPages === currentPage
                      ? `Page ${totalPages}`
                      : `Goto page ${totalPages}`
                  }
                  aria-current={totalPages === currentPage ? 'page' : ''}
                >
                  {totalPages}
                </a>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
};
