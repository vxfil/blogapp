import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Post } from '../components/Post';
import { PostPreview } from '../components/PostPreview';

import { Route, useRouteMatch } from 'react-router-dom';

export const Posts = () => {
  let [posts, setPosts] = useState([]);
  let [currentPage, setCurrentPage] = useState(1);
  let [totalPages, setTotalPages] = useState(1);

  let { path } = useRouteMatch();

  useEffect(() => {
    axios
      .get(`http://localhost:4000/main/get_posts?p=1&l=2`)
      .then((res) => {
        console.log(res);
        const { totalPages, posts } = res.data;
        setTotalPages(totalPages);
        setPosts(posts);
      })
      .catch((err) => console.log(err));
  }, []);

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

  const pageSelectionHandler = (page) => {
    axios
      .get(`http://localhost:4000/main/get_posts?p=${page}&l=2`)
      .then((res) => {
        console.log(res);
        const { totalPages, posts } = res.data;
        setTotalPages(totalPages);
        setPosts(posts);
        console.log(posts);
      })
      .catch((err) => console.log(err));
    setCurrentPage(page);
  };

  const next = () => {
    if (currentPage === totalPages) {
      return;
    }
    pageSelectionHandler(currentPage + 1);
    return setCurrentPage((currentPage += 1));
  };

  const prev = () => {
    if (currentPage === 1) {
      return;
    }
    pageSelectionHandler(currentPage - 1);
    return setCurrentPage((currentPage -= 1));
  };

  return (
    <div className="hero has-background-info-light is-fullheight-with-navbar">
      <div className="container">
        {posts.map((post, index) => {
          return (
            <PostPreview
              preview={post.preview}
              date={post.createdAt}
              userId={post.userId}
              _id={post._id}
              key={index}
            />
          );
        })}
        <Route path={`${path}/:postId`} component={Post} />
      </div>

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
                onClick={() => pageSelectionHandler(1)}
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
                    onClick={() => pageSelectionHandler(page)}
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
                  onClick={() => pageSelectionHandler(totalPages)}
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
