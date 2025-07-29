import Banner from "../components/HomeBanner";
import Trending from "../components/Trending";

export default function Home() {
  return (
    <div>
      <Banner />
      <h1 className="text-3xl font-bold mt-10 ml-10 mb-10 px-8">Xu hướng hiện nay</h1>
      <Trending />
    </div>
  );
}