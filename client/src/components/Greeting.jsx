import React from "react";

const Greeting = () => {
  return (
    <div class="lg:w-1/2">
      <h2 class="text-4xl font-semibold text-gray-100">Brand</h2>

      <h3 class="text-2xl font-semibold text-gray-100">
        Hello <span class="text-blue-400">Guest</span>
      </h3>

      <p class="mt-3 text-gray-100">
        Lorem ipsum dolor sit amet, consectetur adipiscing.
      </p>
    </div>
  );
};

export default Greeting;
