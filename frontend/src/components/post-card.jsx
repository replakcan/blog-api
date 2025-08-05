import { useContext, useEffect, useState } from 'react'
import Card from './card'
import CommentCard from './comment-card'
import { axiosInstance } from '../api/axiosInstance'
import UserContext from '../user-context'
import { MessageCircleDashed, MessageCircle, MessageCirclePlus, MessageCircleOff } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function PostCard({ post, comments }) {
  const [postComments, setPostComments] = useState(comments)
  const { user } = useContext(UserContext)
  const [isVisible, setIsVisible] = useState({ newComment: false, comments: false })
  const [commentData, setCommentData] = useState({
    text: ''
  })
  const [postUser, setPostUser] = useState()
  let navigate = useNavigate()

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axiosInstance.get(`posts/${post.id}/comments`)
        setPostComments(res.data)
      } catch (error) {
        console.error('Failed to fetch comments:', error)
      }
    }

    const fetchPostUser = async () => {
      try {
        const res = await axiosInstance.get(`author/${post.userId}`)

        setPostUser(res.data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchComments()
    fetchPostUser()
  }, [post.id, post.userId])

  const handleToggleComments = () => {
    setIsVisible(prevState => ({ ...prevState, comments: !prevState.comments }))
  }

  const handleToggleNewComment = () => {
    setIsVisible(prevState => ({ ...prevState, newComment: !prevState.newComment }))
  }

  const handleChange = e => {
    const { name, value } = e.target

    setCommentData(prevState => ({ ...prevState, [name]: value }))
  }

  const handleUsernameClick = () => {
    navigate(`/author/${postUser.id}`)
  }

  const handleSubmit = async e => {
    e.preventDefault()

    try {
      await axiosInstance.post(`posts/${post.id}/comments`, { ...commentData, postId: post.id, userId: user.id })

      setCommentData({ text: '' })
      setIsVisible(prevState => ({ ...prevState, newComment: false }))

      const res = await axiosInstance.get(`posts/${post.id}/comments`)
      setPostComments(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Card>
      <div title={`see ${postUser?.username}'s details`} className="card-user" onClick={handleUsernameClick}>
        @{postUser?.username}
      </div>
      <h1>{post.title}</h1>
      <p>{post.text}</p>
      {isVisible.newComment && (
        <form onSubmit={e => handleSubmit(e)}>
          <textarea name="text" value={commentData.text} onChange={handleChange}></textarea>
          <button type="submit">Confirm</button>
        </form>
      )}
      {isVisible.comments &&
        (postComments.length > 0 ? (
          postComments.map(comment => <CommentCard key={comment.id} comment={comment} />)
        ) : (
          <p>
            <em>No comments have been made yet.</em>
          </p>
        ))}
      <p>{post.updatedAt}</p>
      <div className="button-group">
        <i title="add a comment" onClick={handleToggleNewComment}>
          {isVisible.newComment ? <MessageCircleOff /> : <MessageCirclePlus />}
        </i>

        <i title={isVisible.comments ? 'hide comments' : 'show comments'} onClick={handleToggleComments}>
          {!isVisible.comments ? <MessageCircle /> : <MessageCircleDashed />}
        </i>
      </div>
    </Card>
  )
}
