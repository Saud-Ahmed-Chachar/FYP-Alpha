import React from 'react';

const BlogPosts = () => {
  return (
    <div className="container">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {/* Each blog post */}
        {/* Post 1 */}
        <div className="col-span-1 md:col-span-2 lg:col-span-1 shadow-lg shadow-gray-900">
          <div className="bg-white rounded-lg overflow-hidden transition-transform duration-300 transform hover:scale-105">
            <img
              src="https://beastdesires.com/wp-content/uploads/2024/03/air-fibre-720x380.jpg"
              alt="Air Fibre"
              className="w-full h-64 object-cover object-center"
            />
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                <a href="https://beastdesires.com/the-future-of-broadband-access-air-fibre-technologys-transformative-impact/" className="hover:text-blue-600">
                  "The Future of Broadband Access: Air-Fibre Technology’s Transformative Impact"
                </a>
              </h2>
              <p className="text-gray-700 text-base">
                Introduction: In the ever-evolving landscape of telecommunications, where speed, reliability, and accessibility are paramount, a groundbreaking innovation has emerged: Air-Fibre…
              </p>
              <a href="https://beastdesires.com/the-future-of-broadband-access-air-fibre-technologys-transformative-impact/" className="text-blue-500 mt-4 inline-block">Read More</a>
            </div>
          </div>
        </div>
        {/* Post 2, 3, 4, 5... */}
      </div>
    </div>
  );
};

export default BlogPosts;
