import SignupComponent from "@/components/forms/Signup";
import MetaHead from "@/components/MetaHead";
import withPublicRoute from "@/components/PublicRoute";

function Signup() {
  return (
    <>
      <MetaHead>
        <title>B-Media &gt; Sign up</title>
      </MetaHead>
   
        <div>
          <SignupComponent />
        </div>

    </>
  );
}

const SingupPage = withPublicRoute(Signup)

export default SingupPage;
