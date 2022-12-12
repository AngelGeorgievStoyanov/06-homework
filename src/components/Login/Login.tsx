import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import React, { BaseSyntheticEvent, FormEvent } from 'react'
import {useForm } from 'react-hook-form'
import FormInputText from '../FormInputText/FormInputText'
import { UserListenerLogin } from '../shared/common-types'
import SendIcon from '@mui/icons-material/Send';
import CancelIcon from '@mui/icons-material/Cancel';


const EMPTY_USERNAME = '';
const EMPTY_PASSWORD = '';


interface LoginProps {

    onLogin: UserListenerLogin;
    onTogle: React.MouseEventHandler<HTMLButtonElement>;
    username:string;
    password:string;
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

        const  newusername = data.username;
        const  mewpassword = data.password;

        onLogin(newusername, mewpassword);

        reset({username,password});
      
    }

    const onReset = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
              reset();
    }



    return (
        <>
          

            <Box
                component="form"
                sx={{
                    backgroundColor: '#ddddfff7',
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
                <Button variant="contained"  onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => onTogle(e)} sx={{':hover':{color:'rgb(248 245 245)'}, background:'rgb(194 194 224)', color:'rgb(144 144 166)'}} >Don't Have An Account? Sign up!</Button>

            </Box>

        </>
    )

}

export default Login