import {
  IconWhiskey,
  IconBasket,
  IconAlertCircle,
  IconStar,
} from '../components/icons'
import MetricCard from '../components/MetricCard'

const cards = [
  { title: 'Total Bourbons', value: '156', icon: IconWhiskey },
  { title: 'In Stock', value: '150', icon: IconBasket },
  { title: 'Out of Stock', value: '4', icon: IconAlertCircle },
  { title: 'Customers at 90%', value: '10', icon: IconStar },
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
          />
        ))}
      </div>
    </div>
  )
}
