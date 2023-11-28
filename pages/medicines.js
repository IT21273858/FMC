import Layout from "@/components/Layout";
import Link from "next/link";
export default function Medicines(){
    return (

        <Layout>
            <Link href={'/medicines/new'} className="bg-green-300 text-black py-1 px-2 rounded-md ">Add new Medicine</Link>
        </Layout>
    )
}