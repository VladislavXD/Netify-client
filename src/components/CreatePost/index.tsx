import React from 'react'
import { useCreatePostMutation, useLazyGetAllPostsQuery } from '../../app/services/postsApi'
import { Controller, useForm } from 'react-hook-form';
import { Button, Textarea } from '@nextui-org/react';
import ErrorMessage from '../ErrorMessage';
import { IoMdCreate } from 'react-icons/io';

type Props = {}

const CreatePost = (props: Props) => {
    const [createPost] = useCreatePostMutation();
    const [triggerAllPosts] = useLazyGetAllPostsQuery();

    const {
        handleSubmit,
        control,
        formState: {errors},
        setValue
    } = useForm();

    const error = errors?.post?.message as string


    const onSubmit = handleSubmit(async (data)=> {
        try{    
            await createPost({content: data.post}).unwrap();
            setValue('post', '');
            await triggerAllPosts().unwrap()
        }catch(err){
            console.log(err);
        }
    })
  return (
    <form className='flex-grow' onSubmit={onSubmit}>
        <Controller
            name='post'
            control={control}
            defaultValue=''
            render={({field})=> (
                <Textarea
                    {...field}
                    labelPlacement='outside'
                    placeholder='О чем думаете?'
                    className='mb-5'
                />

            )}
        />
        {error && <ErrorMessage error={error}/>}

        <Button 
            color='success'
            className=" flex-end relative  rounded-full hover:-translate-y-1 px-12 shadow-xl  after:content-[''] after:absolute after:rounded-full after:inset-0 after:bg-background/40 after:z-[-1] after:transition after:!duration-500 hover:after:scale-150 hover:after:opacity-0"
            endContent={<IoMdCreate/>}
            type='submit'
        >
            Добавить
        </Button>
    </form>
  )
}

export default CreatePost