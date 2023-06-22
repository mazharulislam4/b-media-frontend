import LeftAsidebar from "./asidebar/LeftAsidebar";
import RightAsidebar from "./asidebar/RightAsidebar";
import ChatModalGround from "./chat/ChatModalGround";
import Navbar from "./navbar/Navbar";

function Layout({ children, isNavbar = true, isFooter = true }) {
    return (
      <>
        {/* navbar  */}
        <header>
          <Navbar />
        </header>

        {/* main  */}

        <div className="h-screen overflow-hidden relative   bg-slate-100 ">
          <div className="flex w-full md:px-8 px-2  !bg-transparent relative top-[70px] overflow-auto gap-10">
            {/*left asidebar  */}
            <aside
              className={`h-screen w-[600px] hidden xl:block sticky top-0 pt-1 left-0  mt-1 overflow-auto  border-r-red-200 bg-slate-100 `}
            >
              <LeftAsidebar />
            </aside>
            {/* content bar  */}
            <main
              className={` basis-full h-screen   relative overflow-y-auto bg-slate-100 max-w-[800px] mx-auto pb-[80px] `}
            >
              {children}
            </main>
            {/* right asidbar  */}
            <aside
              className={`h-screen basis-[600px] lg:block hidden sticky top-0 right-0  pt-1 mt-1 pl-1 overflow-auto  bg-slate-100`}
            >
              <RightAsidebar />
            </aside>
          </div>
        </div>

        {/* footer  */}
        <footer></footer>
       <ChatModalGround/>
        </>
    );
}

export default Layout;
