import MajorView from "@views/majorView/MajorView";
import $api from "core";

const HomePage = (props) => {
  return (
    <>
      <MajorView extraHeader={true}></MajorView>
    </>
  );
};

export async function getServerSideProps() {
  let posts = null;
  try {
    const allData = await Promise.all([$api.get("/wp/v2/posts")]);
    posts = await allData[0].data;
  } catch (err) {
    console.error(err);
  }

  return {
    props: {
      posts,
    },
  };
}

export default HomePage;
