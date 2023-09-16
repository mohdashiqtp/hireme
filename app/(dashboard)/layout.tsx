import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import SeacrhBar from "@/components/searchbar";
import Sidebar from '@/components/sidebar'

const DashboardLayout = async ({
  children,
}: {
  children: React.ReactNode
}) => {
  

  return ( 
    <div className=" h-full  relative bg-white" >
      {/* <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-80 bg-gray-900">
        <Sidebar  />
      </div> */}
      <main className=" pb-10">
        <Navbar />
       
        {children}

        <Footer />
      </main>
    </div>
   );
}
 
export default DashboardLayout;