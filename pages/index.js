import Link from "next/link";
import Layout from "@/components/Layout";

export default function Home() {
  return (
    <Layout>
      <div className="p-6">
        <h1 className="text-4xl font-bold mb-6">Rețetar Simplu</h1>

        <Link href="/recipes/create">
          <button className="mb-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Creează rețetă
          </button>
        </Link>

        <br />

        <Link href="/recipes" className="text-blue-600 hover:underline">
          Vezi toate rețetele
        </Link>
      </div>
    </Layout>
  );
}
