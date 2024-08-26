import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const api_url = "https://the-trivia-api.com/api/questions";

const TestList = () => {
  const [tests, setTests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await fetch(api_url);
        const data = await response.json();
        setTests(data);
      } catch (error) {
        console.error("Failed to fetch tests", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTests();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mx-auto md:max-w-lg mt-24">
      <h1 className="text-2xl font-bold mb-5">Available Tests</h1>
      {tests.length > 0 ? (
        <ul className="list-disc pl-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 w-fit">
          {tests.map((test, index) => (
            <li key={test.id} className="mb-3 card bg-base-100 shadow-xl w-fit">
              <Link to={`/app/user/tests/${index}`} className=" card-body">
                {test.category}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div>No tests available.</div>
      )}
    </div>
  );
};

export default TestList;
