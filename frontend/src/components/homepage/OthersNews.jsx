import React from "react";
import img from "../../assets/prachanda.jpg";
import Card from "../props/Card";
function OthersNews() {
  return (
    <div className="cards mt-4 mb-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <Card
      image={img}
      title="तौल घटाउँदै हुनुहुन्छ ? बाधक बन्लान् यी फलहरू"
      />
      <Card
      image={img}
      title="तौल घटाउँदै हुनुहुन्छ ? बाधक बन्लान् यी फलहरू"
      />
      <Card
      image={img}
      title="तौल घटाउँदै हुनुहुन्छ ? बाधक बन्लान् यी फलहरू"
      />
      <Card
      image={img}
      title="तौल घटाउँदै हुनुहुन्छ ? बाधक बन्लान् यी फलहरू"
      />
      <Card
      image={img}
      title="तौल घटाउँदै हुनुहुन्छ ? बाधक बन्लान् यी फलहरू"
      />
      <Card
      image={img}
      title="तौल घटाउँदै हुनुहुन्छ ? बाधक बन्लान् यी फलहरू"
      />
    </div>
  );
}

export default OthersNews;
