import React from "react"
import { useParams } from "react-router-dom"
import { useGetPostByIdQuery } from "../../app/services/postsApi"
import Card from "../../components/Card"
import GoBack from "../../components/GoBack"
import CreateComment from "../../components/createComment"

const CurrentPost = () => {
  const params = useParams<{ id: string }>()
  const { data } = useGetPostByIdQuery(params?.id ?? "")

  if (!data) {
    return <h3>Поста не существует</h3>
  }

  const {
    content,
    id,
    authorId,
    comments,
    likes,
    author,
    likeByUser,
    createdAt,
  } = data
  return (
    <>
      <GoBack />
      <Card
        cardFor="current-post"
        avatarUrl={author.avatarUrl ?? ""}
        content={content}
        name={author.name ?? ""}
        likesCount={likes.length}
        commentsCount={comments.length}
        authorId={authorId}
        id={id}
        likeByUser={likeByUser}
        createdAt={createdAt}
      />
      <div className="mt-10">
        <CreateComment />
      </div>
      <div className="mt-10">
        {data.comments
          ? data.comments.map(comment => (
              <Card
                cardFor="comment"
                key={comment.id}
                avatarUrl={comment.user.avatarUrl ?? ""}
                content={comment.content}
                name={comment.user.name ?? ""}
                authorId={comment.user.id ?? ""}
                commentId={comment.id}
                id={id}
              />
            ))
          : null}
      </div>
    </>
  )
}

export default CurrentPost
