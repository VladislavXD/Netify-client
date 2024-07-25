import React from 'react'
import { useLazyGetPostByIdQuery } from '../../app/services/postsApi'
import { Controller, useForm } from 'react-hook-form';
import { Button, Textarea } from '@nextui-org/react';
import ErrorMessage from '../ErrorMessage';
import { IoMdCreate } from 'react-icons/io';
import { useParams } from 'react-router-dom';
import {  useCreateCommentMutation } from '../../app/services/commentsApi';

type Props = {}

const CreateComment = (props: Props) => {
    const {id} = useParams<{id: string}>()
    const [createComment] = useCreateCommentMutation();
    const [getPostById] = useLazyGetPostByIdQuery();

    const {
        handleSubmit,
        control,
        formState: {errors},
        setValue
    } = useForm();

    const error = errors?.post?.message as string


    const onSubmit = handleSubmit(async (data)=> {
        try{    
            if (id){

                await createComment({content: data.comment, postId: id}).unwrap();
                setValue('comment', '');
                await getPostById(id).unwrap()
            }
        }catch(err){
            console.log(err);
        }
    })
  return (
    <form className='flex-grow' onSubmit={onSubmit}>
        <Controller
            name='comment'
            control={control}
            defaultValue=''
            rules={{
                required: 'Обязательное поле'
            }}
            render={({field})=> (
                <Textarea
                    {...field}
                    labelPlacement='outside'
                    placeholder='Напишите комментарий...'
                    className='mb-5'
                />

            )}
        />
        {error && <ErrorMessage error={error}/>}

        <Button 
            color='primary'
            className='flex-end'
            endContent={<IoMdCreate/>}
            type='submit'
        >
            Оставить комментарий
        </Button>
    </form>
  )
}

export default CreateComment