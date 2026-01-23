

export default function Loading() {
  return (
    <div className="w-full h-48 flex items-center justify-center">
      <div className="flex flex-col items-center gap-2">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-500 animate-pulse">Loading dashboard...</p>
      </div>
    </div>
  );
}
