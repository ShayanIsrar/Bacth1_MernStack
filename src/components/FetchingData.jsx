import React, { useEffect, useState } from "react";

const FetchingData = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false); // default false
  const [shouldFetch, setShouldFetch] = useState(false);

  useEffect(() => {
    if (shouldFetch) {
      const fetchPosts = async () => {
        setLoading(true); // start loading only when button is clicked
        try {
          const res = await fetch("https://jsonplaceholder.typicode.com/posts");
          const data = await res.json();
          setPosts(data.slice(0, 10));
        } catch (error) {
          console.error("Error fetching data", error);
        } finally {
          setLoading(false);
        }
      };

      fetchPosts();
    }
  }, [shouldFetch]);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-6 text-blue-600">
        Fetch Posts
      </h1>

      <div className="text-center mb-4">
        <button
          onClick={() => setShouldFetch(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Load Posts
        </button>
      </div>

      {loading && <p className="text-center text-gray-500">Loading...</p>}

      <div className="space-y-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="border rounded-lg p-4 shadow hover:bg-gray-50"
          >
            <h2 className="text-lg text-red-600 font-semibold mb-1">
              {post.id}
            </h2>
            <h2 className="text-lg text-green-400 font-semibold mb-1">
              {post.title}
            </h2>
            <p className="text-gray-700">{post.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FetchingData;
