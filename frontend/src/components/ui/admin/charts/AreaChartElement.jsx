import {
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
} from "recharts";
import PropTypes from "prop-types";

const AreaChartElement = ({ weekSales }) => {
  const currentDate = new Date();

  const colors = [
    "#3498db",
    "#e74c3c",
    "#2ecc71",
    "#f39c12",
    "#9b59b6",
    "#1abc9c",
    "#e67e22",
    "#34495e",
    "#d35400",
  ];
  const generateName = (daysBefore) => {
    const dateBefore = new Date(currentDate);
    dateBefore.setDate(dateBefore.getDate() - daysBefore);
    return dateBefore.toDateString().substring(4, 15);
  };

  const generateBrandValue = (brand, daysBefore) => {
    const dateStr = generateName(daysBefore);

    return weekSales
      .filter((item) => {
        const orderDateWithoutTime = new Date(item.order_date)
          .toDateString()
          .substring(4, 15);
        return item.brand_name === brand && orderDateWithoutTime === dateStr;
      })
      .reduce((acc, item) => acc + item.total_quantity, 0);
  };

  const data = [
    {
      name: generateName(6),
      xiaomi: generateBrandValue("Xiaomi", 6),
      apple: generateBrandValue("Apple", 6),
      samsung: generateBrandValue("Samsung", 6),
      lg: generateBrandValue("LG", 6),
      nokia: generateBrandValue("Nokia", 6),
      huawei: generateBrandValue("Huawei", 6),
      honor: generateBrandValue("Honor", 6),
      lenovo: generateBrandValue("Lenovo", 6),
      sony: generateBrandValue("Sony", 6),
    },
    {
      name: generateName(5),
      xiaomi: generateBrandValue("Xiaomi", 5),
      apple: generateBrandValue("Apple", 5),
      samsung: generateBrandValue("Samsung", 5),
      lg: generateBrandValue("LG", 5),
      nokia: generateBrandValue("Nokia", 5),
      huawei: generateBrandValue("Huawei", 5),
      honor: generateBrandValue("Honor", 5),
      lenovo: generateBrandValue("Lenovo", 5),
      sony: generateBrandValue("Sony", 5),
      pv: 6,
    },
    {
      name: generateName(4),
      xiaomi: generateBrandValue("Xiaomi", 4),
      apple: generateBrandValue("Apple", 4),
      samsung: generateBrandValue("Samsung", 4),
      lg: generateBrandValue("LG", 4),
      nokia: generateBrandValue("Nokia", 4),
      huawei: generateBrandValue("Huawei", 4),
      honor: generateBrandValue("Honor", 4),
      lenovo: generateBrandValue("Lenovo", 4),
      sony: generateBrandValue("Sony", 4),
      pv: 11,
    },
    {
      name: generateName(3),
      xiaomi: generateBrandValue("Xiaomi", 3),
      apple: generateBrandValue("Apple", 3),
      samsung: generateBrandValue("Samsung", 3),
      lg: generateBrandValue("LG", 3),
      nokia: generateBrandValue("Nokia", 3),
      huawei: generateBrandValue("Huawei", 3),
      honor: generateBrandValue("Honor", 3),
      lenovo: generateBrandValue("Lenovo", 3),
      sony: generateBrandValue("Sony", 3),
      pv: 2,
    },
    {
      name: generateName(2),
      xiaomi: generateBrandValue("Xiaomi", 2),
      apple: generateBrandValue("Apple", 2),
      samsung: generateBrandValue("Samsung", 2),
      lg: generateBrandValue("LG", 2),
      nokia: generateBrandValue("Nokia", 2),
      huawei: generateBrandValue("Huawei", 2),
      honor: generateBrandValue("Honor", 2),
      lenovo: generateBrandValue("Lenovo", 2),
      sony: generateBrandValue("Sony", 2),
      pv: 2,
    },
    {
      name: generateName(1),
      xiaomi: generateBrandValue("Xiaomi", 1),
      apple: generateBrandValue("Apple", 1),
      samsung: generateBrandValue("Samsung", 1),
      lg: generateBrandValue("LG", 1),
      nokia: generateBrandValue("Nokia", 1),
      huawei: generateBrandValue("Huawei", 1),
      honor: generateBrandValue("Honor", 1),
      lenovo: generateBrandValue("Lenovo", 1),
      sony: generateBrandValue("Sony", 1),
      pv: 2,
    },
    {
      name: generateName(0),
      xiaomi: generateBrandValue("Xiaomi", 0),
      apple: generateBrandValue("Apple", 0),
      samsung: generateBrandValue("Samsung", 0),
      lg: generateBrandValue("LG", 0),
      nokia: generateBrandValue("Nokia", 0),
      huawei: generateBrandValue("Huawei", 0),
      honor: generateBrandValue("Honor", 0),
      lenovo: generateBrandValue("Lenovo", 0),
      sony: generateBrandValue("Sony", 0),
      pv: 2,
    },
  ];

  const generateLinearGradient = (brand, index) => {
    const gradientId = `color${brand}`;

    return `
      <linearGradient id="${gradientId}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="${colors[index]}" stopOpacity={0.8} />
        <stop offset="95%" stopColor="${colors[index]}" stopOpacity={0} />
      </linearGradient>
    `;
  };

  return (
    <AreaChart
      width={1000}
      height={350}
      data={data}
      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
    >
      <defs>
        {/* <linearGradient id="colorXiaomi" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
        </linearGradient>
        <linearGradient id="colorApple" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
        </linearGradient> */}
        {generateLinearGradient("Xiaomi", 0)}
        {generateLinearGradient("Apple", 1)}
        {generateLinearGradient("LG", 2)}
        {generateLinearGradient("Nokia", 3)}
        {generateLinearGradient("Honor", 4)}
        {generateLinearGradient("Huawei", 5)}
        {generateLinearGradient("Sony", 6)}
        {generateLinearGradient("Samsung", 7)}
        {generateLinearGradient("Lenovo", 8)}
      </defs>
      <XAxis dataKey="name" />
      <YAxis />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <Area
        type="monotone"
        dataKey="xiaomi"
        stroke={colors[0]}
        fillOpacity={1}
        fill="url(#colorXiaomi)"
      />
      <Area
        type="monotone"
        dataKey="apple"
        stroke={colors[1]}
        fillOpacity={1}
        fill="url(#colorApple)"
      />
      <Area
        type="monotone"
        dataKey="samsung"
        stroke={colors[2]}
        fillOpacity={1}
        fill="url(#colorSamsung)"
      />
      <Area
        type="monotone"
        dataKey="lg"
        stroke={colors[3]}
        fillOpacity={1}
        fill="url(#colorLG)"
      />
      <Area
        type="monotone"
        dataKey="nokia"
        stroke={colors[4]}
        fillOpacity={1}
        fill="url(#colorNokia)"
      />
      <Area
        type="monotone"
        dataKey="huawei"
        stroke={colors[5]}
        fillOpacity={1}
        fill="url(#colorHuawei)"
      />
      <Area
        type="monotone"
        dataKey="honor"
        stroke={colors[6]}
        fillOpacity={1}
        fill="url(#colorHonor)"
      />
      <Area
        type="monotone"
        dataKey="lenovo"
        stroke={colors[7]}
        fillOpacity={1}
        fill="url(#colorLenovo)"
      />
      <Area
        type="monotone"
        dataKey="sony"
        stroke={colors[8]}
        fillOpacity={1}
        fill="url(#colorSony)"
      />
    </AreaChart>
  );
};

AreaChartElement.propTypes = {
  weekSales: PropTypes.array.isRequired,
};

export default AreaChartElement;
