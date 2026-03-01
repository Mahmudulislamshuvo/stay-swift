const NoHotelsFound = () => {
  return (
    <div className="flex flex-col items-center justify-center border border-gray/20 p-12 rounded-md text-center bg-gray-50/30">
      {/* আইকন বা ইমোজি (আপনি চাইলে এখানে কোনো SVG আইকনও ব্যবহার করতে পারেন) */}
      <div className="bg-gray-200/50 w-24 h-24 rounded-full flex items-center justify-center mb-4">
        <span className="text-5xl opacity-70">🏨</span>
      </div>

      <h2 className="text-2xl font-bold text-gray-800 mb-2">No Hotels Found</h2>

      <p className="text-gray-500 max-w-md mx-auto mb-6">
        We couldn&apost find any properties matching your current search
        criteria. Try adjusting your destination, dates, or clearing your
        filters.
      </p>
    </div>
  );
};

export default NoHotelsFound;
