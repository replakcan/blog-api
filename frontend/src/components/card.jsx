import '../styles/card.css'

export default function Card({ children, ...rest }) {
  return (
    <div {...rest} className="card">
      {children}
    </div>
  )
}
