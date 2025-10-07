import React, { useEffect, useMemo, useCallback, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useTopic } from "../../hooks/useTopic";
import { useVote } from "../../hooks/useVote";
import Header from "./layout/Header";
import SearchTag from "./layout/SearchTag";
import Grid from "./layout/Grid";
import Pagination from "./layout/Pagination";

const Main = () => {
  const { loading, fetchTopics, countAllTopics } = useTopic();
  const { submitVote } = useVote();

  const [topics, setTopics] = useState([]);
  const [totalTopics, setTotalTopics] = useState(0);

  const [searchParams, setSearchParams] = useSearchParams();

  const category = searchParams.get("category") || "";
  const sort = searchParams.get("sort") || "created_at";
  const search = searchParams.get("search") || "";
  const page = parseInt(searchParams.get("page") || "1", 10);
  const topicsPerPage = 12;

  const loadTopics = useCallback(async () => {
    const data = await fetchTopics({
      offset: page,
      limit: topicsPerPage,
      sort,
      category,
      search,
    });
    if (data) setTopics(data);
  }, [fetchTopics, page, sort, category, search]);

  useEffect(() => {
    countAllTopics(category, search).then((count) => {
      setTotalTopics(count || 0);
    });
    loadTopics();
  }, [category, sort, page, search]);

  const onSortChange = (e) => {
    const updated = new URLSearchParams(searchParams);
    updated.set("sort", e.target.value);
    updated.set("page", 1);
    setSearchParams(updated);
  };

  const titleText = useMemo(() => {
    if (search) return `"${search}" 검색 결과`;
    if (category) return `${category} 토픽`;
    return "전체 토픽";
  }, [search, category]);

  const onSearchClear = () => {
    const updated = new URLSearchParams(searchParams);
    updated.delete("search");
    setSearchParams(updated);
  };

  const onPageChange = (p) => {
    const updated = new URLSearchParams(searchParams);
    updated.set("page", p);
    setSearchParams(updated);
  };

  const onVote = (topic_id, index) => {
    submitVote({ topicId: topic_id, voteIndex: index });
  };

  return (
    <div className="w-full px-4 py-4 bg-white">
      <div className="max-w-8xl mx-auth">
        <Header
          title={titleText}
          total={totalTopics}
          sort={sort}
          onSortChange={onSortChange}
        />
        <SearchTag search={search} onClear={onSearchClear} />

        <Grid topics={topics} loading={loading} onVote={onVote} />

        <Pagination
          currentPage={page}
          total={totalTopics}
          perPage={topicsPerPage}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
};

export default Main;
