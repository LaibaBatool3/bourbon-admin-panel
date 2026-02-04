import { IconBasket } from '../components/icons'
import totalBourbonsImg from '../assets/icons/total-bourbons.png'
import outOfStockImg from '../assets/icons/out of stock.png'
import starImg from '../assets/icons/Star.png'
import MetricCard from '../components/MetricCard'

const cards = [
  { title: 'Total Bourbons', value: '156', iconSrc: totalBourbonsImg },
  { title: 'In Stock', value: '150', icon: IconBasket },
  { title: 'Out of Stock', value: '4', iconSrc: outOfStockImg },
  { title: 'Customers at 90%', value: '10', iconSrc: starImg },
]

export default function Dashboard() {
  return (
    <div className="flex h-full flex-col">
      <div className="flex min-w-0 gap-6">
        {cards.map((card) => (
          <MetricCard
            key={card.title}
            title={card.title}
            value={card.value}
            icon={card.icon}
            iconSrc={card.iconSrc}
          />
        ))}
      </div>
    </div>
  )
}
