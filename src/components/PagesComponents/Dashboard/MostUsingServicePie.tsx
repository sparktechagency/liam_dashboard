import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

type TProps = {
    result: {
        categoryName: string;
        count: number;
    }[]
}

const MostUsingServicePie = ({ result }: TProps) => {

    const data = result?.map((cv)=>({
        name: cv.categoryName,
        value: cv.count
    }))

    // const data = [
    //     { name: 'Painter', value: 400 },
    //     { name: 'Elecetric', value: 300 },
    //     { name: 'Cleaner', value: 300 },
    //     { name: 'Plumber', value: 200 },
    //     { name: 'Goni', value: 50 },
    // ];

    const COLORS = data.map((_, i) => `hsl(${(i * 360) / data.length}, 70%, 50%)`);


    return (
        <>
            <>
                <div className=' bg-white px-5 py-4 rounded-lg'>
                    <h2 className=' mb-4 text-2xl font-semibold text-primaryColor'>Most Using Services</h2>
                    <div className="flex flex-wrap justify-center gap-4 items-center mb-4">
                        {data.map((item, i) => (
                            <div key={item.name} className="flex items-center gap-2">
                                <div
                                    className="w-12 h-4 rounded"
                                    style={{ backgroundColor: COLORS[i] }}
                                ></div>
                                <p className="text-sm font-medium">{item.name}</p>
                            </div>
                        ))}
                    </div>
                    <div>
                        <ResponsiveContainer width="100%" height={200}>
                            <PieChart width={400} height={400}>
                                <Pie
                                    data={data}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    // label={renderCustomizedLabel}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {data.map((_, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </>
        </>
    );
};

export default MostUsingServicePie;