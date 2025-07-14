import { Fragment, useContext } from 'react'
import TestContext from '../test-context'
import CommentCard from '../components/comment-card'

export default function UserComments() {
  const { user } = useContext(TestContext)
  console.log(user)

  const comments = user.comments

  if (comments.length < 1)
    return (
      <p>
        <em>No comments</em>
      </p>
    )

  return (
    <>
      {comments.map(comment => {
        return (
          <Fragment key={comment.id}>
            <CommentCard comment={comment} />
          </Fragment>
        )
      })}
    </>
  )
}
