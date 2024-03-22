import { auth } from "./auth";
import { redirect } from "next/navigation";
import Table from "../components/Table"
const Page = async () => {

  const session = await auth();
  const res = await fetch(`${process.env.API_URL}/api/products?user_id=${session?.user._id}`, {
    cache: "no-store",
  });
  
  const products = await res.json();
  if (!session?.user) {
    redirect("/login")
  }
  return (

    <section className="min-h-[85vh] flex justify-center items-center">
    <Table products={products} userId={session.user._id}/>
    </section>
 
  );
};

export default Page;
