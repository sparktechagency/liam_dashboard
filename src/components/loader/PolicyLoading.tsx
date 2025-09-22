
const PolicyLoading = () => {
  return (
    <div className="p-4 bg-purple-100 min-h-screen">
      {/* Title Skeleton */}
      <div className="h-5 w-40 bg-purple-200 rounded mb-4 animate-pulse"></div>

      {/* Editor Skeleton */}
      <div className="w-full h-64 bg-purple-200 rounded-lg mb-6 animate-pulse"></div>

      {/* Button Skeleton */}
      <div className="flex justify-center">
        <div className="h-10 w-40 bg-purple-300 rounded-lg animate-pulse"></div>
      </div>
    </div>
  )
}

export default PolicyLoading
