import Head from "next/head";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import Header from "../components/Header";
import LargeCard from "../components/LargeCard";
import MediumCard from "../components/MediumCard";
import SmallCard from "../components/SmallCard";

export default function Home({ exploreData, cardsData }) {
  return (
    <div className="">
      <Head>
        <title>Airbnb</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header */}
      <Header />

      {/* Banner */}
      <Banner />

      <main className="max-w-7xl mx-auto px-8 sm:px-16 bg-white shadow-lg">
        <section className="pt-6">
          <h2 className="text-4xl font-semibold pb-5">Explore Nearby</h2>

          {/* pull data from server to show -SSR or static rendering-> as this is first page so if data is noy changing can use static rendering  */}
          <div className="grid gridcols-1 sm:grid-cols-2 md:grid-cols-3">
            {exploreData &&
              exploreData.map((item, index) => (
                <SmallCard
                  key={index}
                  image={item.img}
                  location={item.location}
                  distance={item.distance}
                />
              ))}
          </div>
        </section>

        {/** another section */}
        <section>
          <h2 className="text-4xl font-semibold py-8">Live Anywhere</h2>
          <div className="flex space-x-3 overflow-scroll  scrollbar-hide p-3 -ml-3">
            {cardsData &&
              cardsData.map((item, index) => (
                <MediumCard key={index} image={item.img} title={item.title} />
              ))}
          </div>
        </section>

        <LargeCard
          image="https://links.papareact.com/4cj"
          title="The Greatest Outdoors"
          description="Wishlist created by Airbnb"
          buttonText="Get Inspired"
        />
      </main>

      <Footer />
    </div>
  );
}

export async function getStaticProps() {
  const exploreData = await fetch("https://links.papareact.com/pyp")
    .then((res) => res.json())
    .catch((err) => console.error("Explore Json Error"));

  const cardsData = await fetch("https://links.papareact.com/zp1")
    .then((res) => res.json())
    .catch((err) => console.error("error in fetching data"));

  return {
    props: {
      exploreData,
      cardsData,
    },
  };
}
