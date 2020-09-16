import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

function GithubCommit() {
  const [page, setPage] = useState(1);
  const [commitHistory, setCommitHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadMoreCommit = () => {
    setPage(page + 1);
  };

  const Pager = () => {
    if (commitHistory.length === 0) {
      return <div>No more commits</div>;
    } else {
      return (
        <>
          <hr />
          Page {page}
          &nbsp;&nbsp;
          <button onClick={loadMoreCommit}>Next Page</button>
        </>
      );
    }
  };
  const CommitList = () => {
    return (
      <div>
        <Pager />
        <hr />
        {commitHistory.map((c, index) => (
          <div key={index}>
            {c.commit && (
              <>
                <div>
                  <h2 style={{ textDecoration: "Underline" }}>
                    {c.commit.committer.name}
                  </h2>
                  <p>{c.commit.message}</p>
                </div>
                <hr />
              </>
            )}
          </div>
        ))}
      </div>
    );
  };

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://api.github.com/search/commits?q=repo:facebook/react+css&page=${page}`,
      {
        method: "GET",
        headers: new Headers({
          Accept: "application/vnd.github.cloak-preview"
        })
      }
    )
      .then((res) => res.json())
      .then((response) => {
        setCommitHistory(response.items);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, [page]);

  return (
    <div>
      <h2>Facebook GitHub Commits</h2>
      {isLoading ? <p>Loading commits... </p> : <CommitList />}
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<GithubCommit />, rootElement);
