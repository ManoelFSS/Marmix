
export default function Header() {
  return (
    <header className="h-16 w-full bg-white border-b border-gray-200 shadow-sm flex items-center px-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gray-900 flex items-center justify-center">
          <span className="text-white font-bold text-xl">M</span>
        </div>
        <h1 className="text-gray-800 font-semibold text-[1.8rem]">Marmix</h1>
      </div>
    </header>
  );
}
