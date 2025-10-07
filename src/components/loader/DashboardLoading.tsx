
const DashboardLoading = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4 md:p-8">
      <div className="mx-auto space-y-6">
        {/* Stats Cards Row */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="rounded-lg border border-gray-300 bg-white p-6 shadow-sm">
              <div className="flex flex-col items-center space-y-4">
                {/* Title */}
                <div className="h-5 w-24 animate-pulse rounded-md bg-gray-200" />

                {/* Icon */}
                <div className="h-12 w-12 animate-pulse rounded-full bg-gray-200" />

                {/* Value */}
                <div className="h-7 w-20 animate-pulse rounded-md bg-gray-200" />
              </div>
            </div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Daily Service Chart */}
          <div className="rounded-lg border border-gray-300 bg-white p-6 shadow-sm">
            <div className="space-y-6">
              {/* Chart Title */}
              <div className="h-6 w-32 animate-pulse rounded-md bg-gray-200" />

              {/* Chart Area */}
              <div className="space-y-4">
                {/* Y-axis labels */}
                <div className="flex items-end justify-between gap-2">
                  {[...Array(7)].map((_, i) => (
                    <div key={i} className="flex flex-1 flex-col items-center gap-2">
                      <div
                        className="w-full animate-pulse rounded-t-md bg-gray-200"
                        style={{ height: `${Math.random() * 150 + 50}px` }}
                      />
                      <div className="h-3 w-4 animate-pulse rounded-md bg-gray-200" />
                    </div>
                  ))}
                </div>

                {/* X-axis */}
                <div className="h-px w-full animate-pulse bg-gray-200" />
              </div>
            </div>
          </div>

          {/* Most Using Services Chart */}
          <div className="rounded-lg border border-gray-300 bg-white p-6 shadow-sm">
            <div className="space-y-6">
              {/* Chart Title */}
              <div className="h-6 w-40 animate-pulse rounded-md bg-gray-200" />

              <div className="flex flex-col items-center gap-6 md:flex-row md:justify-around">
                {/* Legend */}
                <div className="space-y-3">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="h-4 w-4 animate-pulse rounded-sm bg-gray-200" />
                      <div className="h-4 w-16 animate-pulse rounded-md bg-gray-200" />
                    </div>
                  ))}
                </div>

                {/* Pie Chart */}
                <div className="h-48 w-48 animate-pulse rounded-full bg-gray-200" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardLoading;