"use client";

import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";
import useDebounce from "@hooks/useDebounce";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <PromptCard key={post._id} post={post} />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);

  const debouncedInputValue = useDebounce(searchText, 300);

  const fetchPosts = async () => {
    let apiFetchPrompt = "/api/prompt";

    if (searchText) {
      apiFetchPrompt = apiFetchPrompt + `?searchText=${debouncedInputValue}`;
    }

    const response = await fetch(apiFetchPrompt);
    const data = await response.json();

    setPosts(data);
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    fetchPosts();
  }, [debouncedInputValue]);

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          type='text'
          placeholder='Search for a tag or username'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>

      <PromptCardList data={posts} handleTagClick={() => {}} />
    </section>
  );
};

export default Feed;
