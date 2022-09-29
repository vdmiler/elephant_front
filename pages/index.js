import { API_URL } from "@utils/constants/settings.constants";
import MajorView from "@views/majorView/MajorView";
import axios from "axios";

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
    const allData = await Promise.all([
      axios({ method: "GET", url: API_URL + "/wp/v2/posts" }),
    ]);
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
