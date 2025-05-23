import Link from "next/link";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <Link href="/" className="group">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent group-hover:from-blue-700 group-hover:to-indigo-700 transition-colors">
                🍳 Rețetar Simplu
              </h1>
            </Link>
            
            <nav className="flex space-x-1">
              <Link href="/recipes" className="px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium">
                Toate rețetele
              </Link>
              <Link href="/recipes/create" className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors font-medium shadow-sm">
                + Creează rețetă
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {children}
      </main>

      <footer className="mt-16 bg-white border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-gray-600 font-medium">
              🍳 Rețetar Simplu
            </p>
            <p className="text-sm text-gray-500 mt-2">
              &copy; {new Date().getFullYear()} Toate drepturile rezervate. 
              Creat cu ❤️ pentru iubitorii de gătit.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}