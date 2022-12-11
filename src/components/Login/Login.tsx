import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import React, { BaseSyntheticEvent, FormEvent } from 'react'
import { Control, Controller, FieldPath, FieldValues, Path, RegisterOptions, useForm } from 'react-hook-form'
import FormInputText from '../FormInputText/FormInputText'
import { UserListenerLogin } from '../shared/common-types'
import SendIcon from '@mui/icons-material/Send';
import CancelIcon from '@mui/icons-material/Cancel';

import './Login.css'

const EMPTY_USERNAME = '';
const EMPTY_PASSWORD = '';


interface LoginProps {

    onLogin: UserListenerLogin
    onTogle: React.MouseEventHandler<HTMLButtonElement>
    username:string
    password:string
}

type FormData = {

    username: string;
    password: string;

};



function Login({ username = EMPTY_USERNAME, password = EMPTY_PASSWORD, onLogin, onTogle, }: LoginProps) {
    const { control, handleSubmit, reset, formState: { errors, isDirty, isValid } } = useForm<FormData>({
        defaultValues:  {username, password} ,

        mode: 'onChange',

    });


    const loginSubmitHandler = async (data: FormData, event: BaseSyntheticEvent<object, any, any> | undefined) => {

        event?.preventDefault();

        const  newusername = data.username 
        const  mewpassword = data.password 

        onLogin(newusername, mewpassword)

        reset({username,password})

      




    }

    const onReset = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('RESETING FORM');

        reset();
    }



    return (
        <>
            {/* <section className='section-form-login'>
            <h3 className='login-h3'>Login Form</h3>
            <form method='POST' className='form-login' onSubmit={loginSubmitHandler}>

                <span className='span-login'>
                    <label htmlFor="username">Username : </label>
                    <input type="text" name='username' id='username' minLength={5} maxLength={15} />
                </span>
                <span className='span-login'>
                    <label htmlFor="password">Password : </label>
                    <input type="password" name='password' id='password' />
                </span>
                <input className='button-login' type="submit" value={'Login'} />

                <button className='button-go-to-register' onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => onTogle(e)} >Don't Have An Account? Sign up!</button>

            </form>

        </section> */}

            <Box
                component="form"
                sx={{
                    backgroundColor: '#ddf',
                    padding: '20px',
                    '& .MuiFormControl-root': { m: 0.5, width: 'calc(100% - 10px)' },
                    '& .MuiButton-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit(loginSubmitHandler)} onReset={onReset}
            >

                <FormInputText name='username' label='Username' control={control} error={errors.username?.message}
                />
                <FormInputText name='password' label='Password' control={control} type='password' error={errors.password?.message}
              />

                <Button variant="contained" endIcon={<SendIcon />} type='submit' disabled={!(isDirty && isValid)}>
                    Submit
                </Button>
                <Button variant="contained" endIcon={<CancelIcon />} color='warning' type='reset'>
                    Reset
                </Button>
                <button className='button-go-to-register' onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => onTogle(e)} >Don't Have An Account? Sign up!</button>

            </Box>

        </>
    )

}

export default Login