import React, { useState } from 'react'
import {CardBody, CardFooter, CardHeader, Card as NextCard, Spinner} from '@nextui-org/react'
import { unLikePost, useLikePostMutation, useUnLikePostMutation } from '../../app/services/likesApi';
import { deletePost, useDeletePostMutation, useLazyGetAllPostsQuery, useLazyGetPostByIdQuery } from '../../app/services/postsApi';
import { useDeleteCommentMutation } from '../../app/services/commentsApi';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrent } from '../../features/user/UserSlice';
import User from '../User';
import { formatToClientDate } from '../../utils/formatToClientDate';
import { RiDeleteBinLine } from 'react-icons/ri';
import Typography from '../typography';
import MetaInfo from '../metaInfo';
import { FcDislike } from 'react-icons/fc';
import { MdOutlineFavoriteBorder } from 'react-icons/md';
import { FaRegComment } from 'react-icons/fa';
import ErrorMessage from '../ErrorMessage';
import { hasErrorField } from '../../utils/hasErrorField';


type Props = {
    avatarUrl: string;
    name: string;
    authorId: string;
    content: string;
    commentId?: string;
    likesCount?: number;
    commentsCount?: number;
    createdAt?: Date;
    id?: string;
    cardFor: 'comment' | 'post' | 'current-post';
    likeByUser?: boolean;

}

const Card = ({
    name= '',
    avatarUrl = '',
    authorId= '',
    content= '',
    commentId= '',
    likesCount= 0,
    commentsCount= 0,
    createdAt,
    id= '',
    cardFor= 'post',
    likeByUser = false,

}: Props) => {

    const [likePost] = useLikePostMutation();
    const [unlikePost] =useUnLikePostMutation();
    const [triggerAllPosts] = useLazyGetAllPostsQuery();
    const [triggerGetPostById] = useLazyGetPostByIdQuery();
    const [deletePost, deletePostStatus] = useDeletePostMutation();
    const [deleteComment, deleteCommentStatus] = useDeleteCommentMutation();
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const currentUser = useSelector(selectCurrent) 



    const refetchPost = async ()=> {
        switch(cardFor){
            case 'post':
                await triggerAllPosts().unwrap()
                break
            case 'current-post':
                await triggerAllPosts().unwrap()
                break
            case 'comment':
                await triggerGetPostById(id).unwrap()
                break
            default:
                throw new Error('Неверный аргумент cardFor')

        }
    }

    const handleDelete = async()=>{
        try{
            switch(cardFor){
                case 'post':
                    await deletePost(id).unwrap();
                    await refetchPost()
                    break
                case 'current-post':
                    await deletePost(id).unwrap();
                    navigate('/')
                    break
                case 'comment':
                    await deleteComment(commentId).unwrap();
                    await refetchPost();
                    break
                default: 
                    throw new Error('Неверный аргумент cardFor')
                
            }
        }catch(err){
            if (hasErrorField(err)){
                setError(err.data.error)
            }else{
                setError(err as string)
            }
        }
    }



    const handleLike = async ()=> {

        try{
            likeByUser 
                ? await unlikePost(id).unwrap() 
                : await likePost({postId: id}).unwrap();

                
            if(cardFor == 'current-post'){
                await triggerGetPostById(id).unwrap()

            }
            if(cardFor == 'post'){
                await triggerAllPosts().unwrap()

            }
        }catch(err){
            if (hasErrorField(err)){
                setError(err.data.error)
            }else{
                setError(err as string)
            }
        }
    }
  return (
    <NextCard className='mb-5'>
        <CardHeader className="justify-between items-center bg-transparent">
            <Link to={`/user/${authorId}`} >
                <User
                    name={name}
                    className="text-small font-semibold leading-none text-default-600"
                    avatarUrl={avatarUrl}
                    description={createdAt && formatToClientDate(createdAt)}
                />
            </Link>
                {
                    authorId === currentUser?.id && (
                        <div className="cursor-pointer" onClick={handleDelete}>
                            {
                                deletePostStatus.isLoading 
                                || 
                                deleteCommentStatus.isLoading 
                                ? 
                                (
                                    <Spinner/>
                                ) : 
                                (
                                    <RiDeleteBinLine/>
                                )
                            }
                        </div>
                    )
                }
        </CardHeader>
        <CardBody className='px-3 py-2 mb-5'>
                <Typography>{content}</Typography>
        </CardBody>
        {
            cardFor !== 'comment' && (
                <CardFooter className='gap-3'>
                    <div className="flex gap-5 items-center">
                        <div onClick={handleLike}>
                            <MetaInfo 
                            count={likesCount}
                            Icon={likeByUser ? FcDislike : MdOutlineFavoriteBorder}
                            />

                        </div>
                        <Link to={`/posts/${id}`}>
                            <MetaInfo
                                count={commentsCount}
                                Icon={FaRegComment}
                            />
                        </Link>
                    </div>
                    <ErrorMessage error={error}/>
                </CardFooter>
            )
        }
    </NextCard>
  )
}

export default Card