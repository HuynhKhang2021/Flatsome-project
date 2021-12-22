"use-strict";
import React from "react";
import NewsItem from "./NewsItem";
import { useState } from "react";
const DUMMY_NEWSLIST = [
  {
    id: 1,
    title: "Good Places To Study",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 2,
    title: "A New Camera To Buy",

    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 3,
    title: "10 Best Laptops",

    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
];
const NewsList = () => {
  return (
    <div className="news-list container-fluid">
      <div className="news-row">
        {DUMMY_NEWSLIST.map((news) => (
          <NewsItem
            key={news.id}
            item={{
              id: news.id,
              title: news.title,
              description: news.description,
            }}
          ></NewsItem>
        ))}
      </div>
    </div>
  );
};

export default NewsList;
