const SingleContractorLoading = () => {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header Skeleton */}
      <div className="border-b border-gray-200 bg-white dark:bg-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div className="flex-1">
              {/* Title and Button */}
              <div className="flex items-center gap-3 mb-4">
                <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg w-64 animate-pulse" />
                <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg w-24 animate-pulse" />
              </div>

              {/* Contact Info */}
              <div className="space-y-2 mb-6">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-96 animate-pulse" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-48 animate-pulse" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-56 animate-pulse" />
              </div>

              {/* Status Badge */}
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-32 animate-pulse" />
            </div>

            {/* Metrics */}
            <div className="flex flex-col gap-4">
              <div className="bg-gray-200 dark:bg-gray-700 rounded-lg p-4 w-48 h-24 animate-pulse" />
              <div className="bg-gray-200 dark:bg-gray-700 rounded-lg p-4 w-48 h-24 animate-pulse" />
              <div className="bg-gray-200 dark:bg-gray-700 rounded-lg p-4 w-48 h-24 animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Section */}
            <section>
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-4 animate-pulse" />
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 space-y-3">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse" />
              </div>
            </section>

            {/* Skills Section */}
            <section>
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-4 animate-pulse" />
              <div className="flex flex-wrap gap-3">
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-full w-24 animate-pulse" />
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-full w-28 animate-pulse" />
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-full w-20 animate-pulse" />
              </div>
            </section>

            {/* Materials Section */}
            <section>
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-4 animate-pulse" />
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                <div className="grid grid-cols-4 gap-4 p-6 border-b border-gray-200 dark:border-gray-700">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                  ))}
                </div>
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="grid grid-cols-4 gap-4 p-6 border-b border-gray-200 dark:border-gray-700 last:border-b-0"
                  >
                    {[1, 2, 3, 4].map((j) => (
                      <div key={j} className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                    ))}
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column - Certificates */}
          <div>
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-40 mb-4 animate-pulse" />
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 space-y-2"
                >
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse" />
                  <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SingleContractorLoading;
