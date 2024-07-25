import React from "react"
import { useGetAllPostsQuery } from "../../app/services/postsApi"
import CreatePost from "../../components/CreatePost"
import Card from "../../components/Card"

const Posts = () => {
  const { data } = useGetAllPostsQuery()


  console.log(data);
  return (
    <>
      <div className="mb-10 w-full">
          <CreatePost/>
      </div>
      {
        data && data.length > 0 
        ?
        data.map(({
          content,
          author,
          id,
          authorId,
          comments,
          likes,
          likeByUser,
          createdAt
        })=> ( 
          
          
          
            <Card
            key={id}
            avatarUrl={author.avatarUrl ?? ''}
            content={content}
            name={author.name ?? ''}
            likesCount={likes.length}
            commentsCount={comments.length}
            authorId={authorId}
            likeByUser={likeByUser}
            createdAt={createdAt}
            cardFor="post"
            id={id}
          />
          
        )) : null
      }
    </>
  )
}

export default Posts
