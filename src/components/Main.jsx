import PostLabel from "@/components/post/Post";
import Layout from "./Layout";
import MetaHead from "./MetaHead";
import SinglePost from "./post/SinglePost";
function Main() {
 return (
      <>
        <MetaHead>
          <title>B-Media &gt; home </title>
        </MetaHead>
        <Layout>
          <section>
            <PostLabel />
          </section>
          <section>
            <SinglePost />
          </section>
        </Layout>
      </>
    );


  }



export default Main;
