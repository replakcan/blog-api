import { useParams } from 'react-router-dom'
import AuthorCard from '../components/author-card'

export default function AuthorDetails() {
  let params = useParams()

  return <AuthorCard authorId={params.authorId} />
}
