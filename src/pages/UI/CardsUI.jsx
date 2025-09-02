import React from "react";
import DefaultLayout from "../../layouts/DefaultLayout";

export default function CardsUI() {
  const cards = [
    {
      id: 1,
      title: "Can coffee make you a better developer?",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.",
      author: "Jonathan Reinink",
      date: "Aug 18",
      membersOnly: true,
      img: "https://source.unsplash.com/random/150x150?sig=1",
    },
    {
      id: 2,
      title: "Learning Tailwind CSS effectively",
      description:
        "Tailwind CSS is a utility-first CSS framework that can help speed up your development workflow.",
      author: "Jane Doe",
      date: "Sep 5",
      membersOnly: false,
      img: "https://source.unsplash.com/random/150x150?sig=2",
    },
    {
      id: 3,
      title: "React 18 features you should know",
      description:
        "React 18 introduces new features like concurrent rendering and automatic batching.",
      author: "John Smith",
      date: "Oct 1",
      membersOnly: true,
      img: "https://source.unsplash.com/random/150x150?sig=3",
    },
  ];

  return (
    <DefaultLayout>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Cards UI</h1>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => (
            <div
              key={card.id}
              className="max-w-sm w-full lg:max-w-full lg:flex bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div
                className="h-48 lg:h-auto lg:w-48 flex-none bg-cover text-center overflow-hidden"
                style={{ backgroundImage: `url(${card.img})` }}
                title={card.title}
              ></div>
              <div className="border border-gray-200 bg-white p-4 flex flex-col justify-between leading-normal">
                <div className="mb-4">
                  {card.membersOnly && (
                    <p className="text-sm text-gray-600 flex items-center mb-2">
                      <svg
                        className="fill-current text-gray-500 w-3 h-3 mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
                      </svg>
                      Members only
                    </p>
                  )}
                  <div className="text-gray-900 font-bold text-xl mb-2">
                    {card.title}
                  </div>
                  <p className="text-gray-700 text-base">{card.description}</p>
                </div>
                <div className="flex items-center mt-2">
                  <div className="text-sm">
                    <p className="text-gray-900 leading-none">{card.author}</p>
                    <p className="text-gray-600">{card.date}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DefaultLayout>
  );
}
